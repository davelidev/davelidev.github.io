cache = ["search_num_cols", "search_category", "search_difficulty", "search_title", "search_page", "search_has_code", "search_has_code", "search_show_code", "cat_sel", "search_company"];
angular.module('myApp', ['ngSanitize'])
    .controller('TodoListController', function() {
        var todoList = this;
        todoList.todos = [
            {text:'learn AngularJS', done:true},
            {text:'build an AngularJS app', done:false}];

        todoList.addTodo = function() {
            todoList.todos.push({text:todoList.todoText, done:false});
            todoList.todoText = '';
        };

        todoList.remaining = function() {
            var count = 0;
            angular.forEach(todoList.todos, function(todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        todoList.archive = function() {
            var oldTodos = todoList.todos;
            todoList.todos = [];
            angular.forEach(oldTodos, function(todo) {
                if (!todo.done) todoList.todos.push(todo);
            });
        };
    })
    .controller('main', function($scope, $http) {
        var grid = null;
        $scope.search_has_code = true;
        $scope.leetcode = {};
        $scope.search_show_code = true;
        $scope.cat_sel = "All";
        $scope.cat_to_questions = cat_to_questions;

        cache.forEach(function(cache_item){
            if(localStorage[cache_item] !== "undefined")
                $scope[cache_item] = localStorage[cache_item];
            if (["search_has_code", "search_show_code"].includes(cache_item))
                $scope[cache_item] = localStorage[cache_item] == "true"

        })

        $scope.openUrl = function(link) {
            window.open(link, '_blank');
        }

        function parsePg() {
            var from_page_to_page = $scope.search_page.replace(/ /g, '').split("-");
            var from_page = parseInt(from_page_to_page[0]);
            var to_page = parseInt(from_page_to_page[1]);
            return [from_page, to_page]
        }

        function searchPageRange() {
            if ($scope.search_page){
                count = 1;
                var from_page_to_page = $scope.search_page.replace(/ /g, '').split("-");
                var from_page = parseInt(from_page_to_page[0]);
                var to_page = parseInt(from_page_to_page[1]);
                $scope.leetcode.forEach(function (question, id) {
                    if (question.do_show){
                        question.show_by_page = false;
                        if (from_page <= count && count <= to_page){
                            question.show_by_page = true;
                        }
                        count += 1;
                    }
                });
            }else{
                $scope.leetcode.forEach(function (question, id) { question.show_by_page = true;});
            }
        }

        $scope.openSol = function(question) {
            if (!question.code) return;
            $('#codeModal').modal('show');
            $scope.cur_question = question;
        }

        $scope.openArticle = function(question) {
            if (!question.article) return;
            question.article =
                question.article.replace(/<script type="text\/x-mathjax-config">[^>]*>/g, '')
                                .replace(/^[^`]*<body>/g,"")
                                .replace(/<\/body>[^`]*/g,"")
                                .replace(/<[^<]*script[^>]*>/g, "$")
                                .replace(/Rate this article:[^`]*/, "")
                                .replace(/[^`]*(Average Rating:)/, "$1")
            $('#articleModal').modal('show');
            setTimeout(function() {
                // MathJax.Hub.Config({
                //   tex2jax: {
                //          inlineMath: [ ['$','$'], ['\\(','\\)'] ]
                //   }
                // });
                MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                $('#articleModal [src], #articleModal [href]').each(function(i, item) {
                        if (!!item.getAttribute('src') && item.getAttribute('src').startsWith('.'))
                                item.setAttribute('src', "http://leetcode.com/" + question.article_link + '/' + item.getAttribute('src'))
                        if (!!item.getAttribute('href') && item.getAttribute('href').startsWith('.'))
                                item.setAttribute('href', "http://leetcode.com/" + question.article_link + '/' + item.getAttribute('href'))
                        console.log(item);

                })
            }, 500);
            $scope.cur_question = question;
        }

        $scope.applySearch = function(){
            
            cache.forEach(function(cache_item){localStorage[cache_item] = $scope[cache_item]; });
            var patt = new RegExp($scope.cat_to_questions[$scope.cat_sel]);

            $scope.leetcode.forEach(function (question, id) {
                console.log(question.companies)
                if ($scope.search_has_code && ! question.code)
                    question.do_show = false;
                else
                {
                    question.do_show = 
                               (!$scope.search_category || question.categories.join().toLowerCase().includes(($scope.search_category).toLowerCase()))
                           &&  (!$scope.search_difficulty || question.diff.toLowerCase().includes(($scope.search_difficulty).toLowerCase()))
                           &&  (!$scope.search_company || question.companies.join().toLowerCase().includes(($scope.search_company).toLowerCase()));
                    question.do_show = question.do_show && (!$scope.search_title || question.title.toLowerCase().search($scope.search_title.toLowerCase()) != -1);
                    question.do_show = question.do_show && (!$scope.cat_to_questions[$scope.cat_sel] || patt.test(question.title));
                }
                question.show_by_page = false;
                question.show_code = $scope.search_show_code;
            });
            searchPageRange();
            $scope.show_leetcode = $scope.leetcode.filter(function(question){ return question.do_show && question.show_by_page});
        }

        $scope.reloadLayout = function(){
                setTimeout(function(argument) {
                    //$(".grid").isotope( 'layout').isotope();
                    grid.isotope('reloadItems').isotope();
                    grid.imagesLoaded().progress( function() {
                      grid.isotope('layout');
                    });
                }, 0);
        }

        function applyUpdateSearch() { setTimeout(function(){
            $scope.applySearch();
            $scope.$apply();
                
            $scope.search_num_cols = $scope.search_num_cols || "2";
            var classToRemove = $(".grid-item").attr('class').split(" ").filter(x => x.startsWith('col-') && x.endsWith("-custom"))[0];
            $(".grid-item").removeClass(classToRemove);
            $(".grid-item").addClass('col-' + $scope.search_num_cols + '-custom');

            if (grid !== null)
                $scope.reloadLayout();

            if (grid === null)            
            setTimeout(function(argument) {
                grid = $('.grid').isotope({
                  itemSelector: '.grid-item',
                  percentPosition: true,
                  transitionDuration: 0,
                  masonry: {
                    columnWidth: '.col-' + $scope.search_num_cols + '-custom'
                  }, 
                });
                grid.imagesLoaded().progress( function() {
                  grid.isotope('layout');
                });
            }, 500);
        }, 0); 
        }

        $scope.clickApplyFilter = function() { applyUpdateSearch(); }

        $scope.onEnterApplySearch = function(event) { if(event.keyCode == 13) applyUpdateSearch(); }

        $scope.hasCodeApplySearch = function() {$scope.applySearch();}

        $scope.resetSearch = function()
        { 
            cache.forEach(function(cache_item){delete $scope[cache_item]; });
            $scope.search_has_code = true;
            applyUpdateSearch();
        }

        $scope.prevPage = function() {
            var from_page_to_page = parsePg();
            var diff = from_page_to_page[1] - from_page_to_page[0] + 1;
            $scope.search_page = (from_page_to_page[0] - diff) + "-" + (from_page_to_page[1] - diff)
            applyUpdateSearch();
        }

        $scope.nextPage = function() {
            var from_page_to_page = parsePg();
            var diff = from_page_to_page[1] - from_page_to_page[0] + 1;
            $scope.search_page = (from_page_to_page[0] + diff) + "-" + (from_page_to_page[1] + diff)
            applyUpdateSearch();
        }


        function highlight(text){
            text = text.replace(/(?=\b)(abs|delattr|hash|memoryview|set|all|dict|help|min|setattr|any|dir|hex|next|slice|ascii|divmod|id|object|sorted|bin|enumerate|input|oct|staticmethod|bool|eval|int|open|str|breakpoint|exec|isinstance|ord|sum|bytearray|filter|isubclass|pow|super|bytes|float|iter|print|tuple|callable|format|len|property|type|chr|frozenset|list|range|vars|classmethod|getattr|locals|repr|zip|compile|globals|map|reversed|complex|hasattr|max|round)(?=\()/g, "`1`$1`0`")
                       .replace(/(?=\b)([a-z][\w\d]+)(?=\()/g, "`2`$1`0`")
                       .replace(/(!|!=|!==|%|%=|&|&&|&=|\*|\*=|\+|\+=|,|-|-=|\/=|\/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\?|\[|\]|\{|\}|\(|\)|\^|\^=|\||\|=|\|\||~)/g, "`3`$1`0`")
                       .replace(/(?=\b)(and|elif|is|global|as|in|if|from|raise|for|except|finally|print|import|pass|return|exec|else|break|not|with|class|assert|yield|try|while|continue|del|or|def|lambda|async|await|nonlocal)(?=\b)/g, "`4`$1`0`")
                       .replace(/(?=\b)(True|False|None|self|0b[01]+|object)(?=\b)/g, "`5`$1`0`")
                       .replace(/"""/g, "~").replace(/~([^~]*)~/g, '`7`"""$1"""`0`')
                       .replace(/'''/g, "~").replace(/~([^~]*)~/g, "`7`'''$1'''`0`")
                       .replace(/'/g, "~").replace(/~([^~]*)~/g, "`6`'$1'`0`")
                       .replace(/"/g, "~").replace(/~([^~]*)~/g, '`6`"$1"`0`')
                       .replace(/(#[^\n]*)/g, "`8`$1`0`")
            var syntax_replace = ["buildin-function", "object", "bracket", "keyword", "buildin-type", "string", "doc", "comment"].map(function(css){ return "<span class='highlight " + css + "'>" });
            syntax_replace.unshift("</span>");
            for (var i = 0; i < syntax_replace.length; i++)
                text = text.replace(new RegExp("`" + i + "`", "g"), syntax_replace[i]);
            return text;
        }

        function unicodeToChar(text) {
            return text.replace(/\\u[\dA-F]{4}/gi,
                function (match) {
                    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
                });
        }

        var sorted_leetcode = [];
        for (var i in leetcode)
            sorted_leetcode.push([parseInt(i), leetcode[i]])
        sorted_leetcode.sort(function(a, b) { return a[0] - b[0]});
        sorted_leetcode = sorted_leetcode.map(function (id_obj) { return id_obj[1] });
        $scope.leetcode = sorted_leetcode;

        var categories = {};
        $scope.leetcode.forEach(function (question, id) {
            if (question.hasOwnProperty('code'))
                question.code = highlight(unicodeToChar(question.code).replace(/"""/g, '`').replace(/\n[^\n]*`[^`]*`/g, ''));
            question.categories.forEach(function(cat) { categories[cat] = null; })
            question.question = unescape(question.question);
        });

        applyUpdateSearch();

        // var substringMatcher = function(categories) {
        //     return function findMatches(query, cb) {
        //         var matches, substringRegex;
        //         matches = [];
        //         substrRegex = new RegExp(query.split('').join('.*'), 'i');
        //         Object.keys(categories).forEach(
        //         function(category) {
        //             if (substrRegex.test(category))
        //                 matches.push(category);
        //         });
        //         cb(matches);
        //     };
        // };

        // setTimeout(function(){
        //     $(".bootstrap-tagsinput input").attr("name", "categories");
        //     $('.bootstrap-tagsinput input').typeahead({
        //             highlight: true,
        //             minLength: 1
        //         },
        //         {
        //             name: 'categories',
        //             source: substringMatcher(categories)
        //         });
        // }, 100)
    });