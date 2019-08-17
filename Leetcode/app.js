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
//         $http({
//             method: 'GET',
//             url: 'leetcode.json'
//         }).then(function (response){
//             $scope.leetcode = response.data
//         });
    })
    .controller('main', function($scope, $http) {

        $scope.search_has_code = true;
        $scope.leetcode = {};

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

        $scope.applySearch = function(){
            $scope.leetcode.forEach(function (question, id) {
                if ($scope.search_has_code && ! question.code)
                    question.do_show = false;
                else
                    question.do_show = 
                     question.categories.join().toLowerCase().includes(($scope.search_category || "").toLowerCase())
                           && question.diff.toLowerCase().includes(($scope.search_difficulty || "").toLowerCase())
                           && question.title.toLowerCase().includes(($scope.search_title || "").toLowerCase());
                question.show_by_page = false;
            });
            searchPageRange();
        }

        function applyUpdateSearch() { setTimeout(function(){$scope.applySearch(); $scope.$apply();}, 20); }

        $scope.clickApplyFilter = function() { applyUpdateSearch(); }

        $scope.onEnterApplySearch = function(event) { if(event.keyCode == 13) applyUpdateSearch(); }

        $scope.hasCodeApplySearch = function() {$scope.applySearch();}

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

        $scope.applySearch();

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