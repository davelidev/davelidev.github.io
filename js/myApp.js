angular.module('myApp', [])
    .controller('app', function ($scope) {

        var scp = $scope;

        scp.cur_year = new Date().getFullYear();

        scp.get_from_to = function (from_date, to_date, note) {
            return to_date ? [from_date, to_date, note] : from_date
        };

        scp.get_duration = function (from_date, to_date, note) {
            [from_date, to_date, note] = scp.get_from_to(from_date, to_date, note);
            var date_display = "";
            var is_carry_over_year = false;
            if (month_diff = (to_date.getMonth() - from_date.getMonth() + 1)) {
                if (month_diff < 0) {
                    month_diff = 12 + month_diff;
                    is_carry_over_year = true;
                }
                date_display += month_diff == 1 ? month_diff + " mth " : month_diff + " mths "
            }
            if (year_diff = (to_date.getFullYear() - from_date.getFullYear() + (is_carry_over_year ? -1 : 0 )))
                date_display = (year_diff == 1 ? year_diff + " yr " : year_diff + " yrs ") +
                  (date_display ? " & " + date_display : "");
            return date_display.trim() + (note ? note : "");
        };

        scp.get_date_pretty = function (date_inp) {
            var disp = date_inp.toString().split(" ");
            var cur_date = new Date();
            var is_date_same = date_inp.getYear() == cur_date.getYear() &&
                date_inp.getMonth() == cur_date.getMonth() &&
                date_inp.getDay() == cur_date.getDay();
            return is_date_same ? "Present" : disp[1] + " " + disp[3]
        };

        scp.get_interval = function (from_date, to_date) {
            [from_date, to_date] = scp.get_from_to(from_date, to_date);
            return scp.get_date_pretty(from_date) + " - " + scp.get_date_pretty(to_date)
        };

        scp.get_interval_n_duration = function (from_date, to_date, note) {
            [from_date, to_date, note] = scp.get_from_to(from_date, to_date, note);
            return scp.get_interval(from_date, to_date) + ", " + scp.get_duration(from_date, to_date, note)

        };

        scp.get_tag_link = function (tag) {
            return scp.to_link[tag.replace(/ /g, "").toLowerCase()]
        };

        scp.get_tag_icon = function (tag) {
            return "./imgs/icons/" + tag.replace(/ /g, "").toLowerCase() + ".png"
        };

        var proportion;

        function drawChart() {
            var data = google.visualization.arrayToDataTable(proportion);

            var options = {
                title: 'Personality Donut',
                pieHole: 0.4,
                chartArea: {'width': '80%', 'height': '80%'},
                colors: ["#E8E4C6", "#B6B190", "#A5C3CA", "#C6DDE2", "#DCE3EB"],
                backgroundColor: { fill:'transparent' },
            };

            var chart = new google.visualization.PieChart(document.getElementById('donut_chart'));
            chart.draw(data, options);
        }

        google.charts.load("current", {packages: ["corechart"]});


        proportion = [
            ['Trait', 'Portion'],
            ['Laziness', 35],
            ['Curiosity', 25],
            ['Creativity', 15],
            ['Persistence', 15],
            ['Patience', 10],
        ];
        google.charts.setOnLoadCallback(drawChart);


        scp.peronality_breif = "A donut is worth a thousand words, what more to know about a person than by looking\
        at his delicious personality donut? ! !";
        scp.personality_descrition = [
            "I am a lazy programmer, I believe every true programmer should be lazy. This is a good trait to possess as it\
             inspires new ways of handling complicated or repetitive tasks with minimal amount of effort.",
            "What if? This is the question asked by many scientists. I consider myself as an inventor, a mad computer\
            scientist. There're many approaches to tackle one problem, so sometimes I tend to get a little wild on the experimentation.",
            "From experience, I learnt good things take time. I used to get frustrated doing things that are not technically challenging,\
            but eventually most of them turn out to be fun by adding a touch of automation and personalization."

        ];

        scp.experience = [{
            name: "IBM BPM",
            logo: "./imgs/experience/ibm.png",
            interval: [new Date(2014, 4), new Date()],
            positions: [
                {
                    title: "BPM on Cloud Devops",
                    interval: [new Date(2016, 5), new Date(2017,5)],
                    tasks: [
                        {
                            detail: "Create migration scripts, and provisioning scripts in a tight deadline when new " +
                            "product versions come out to ensure new tenants have the latest product and old tenants " +
                            "can be migrated to the newest as well.",
                            tags: ["Bash"]
                        },
                        {
                            detail: "Script and perform global monthly maintenance to ensure all tenants are " +
                            "up-to-date with security measures and product fixes.",
                            tags: ["Bash", "Terminal"]
                        },
                        {
                            detail: "Introduced thread-safe multi-threading strategy to improve time efficiency by " +
                            "1500% for better scalability. Integrated this mechanism with global monthly maintenance to " +
                            "minimize downtime, as well as improve on other report generation tools.",
                            tags: ["Bash"]
                        },
                        {
                            detail: "Created a workflow mechanism to enable automation of operational procedures." +
                            " Leveraging this mechanism to automate and yield a 400% increase in productivity for" +
                            " provisioning, 1000% increase in productivity for performing upgrades, 1100% increase in" +
                            " productivity for taking backups and much more.",
                            tags: ["Python", "Bash"]
                        },
                        {
                            detail: "Mentor for a new employee. Guided and encouraged him to expand on skill sets of" +
                            " interest and to build on existing automation.",
                            tags: ["Terminal", "Bash"]
                        },
                        {
                            detail: "Generate reports and perform analysis to support various high level decision" +
                            " makings(e.g. Proposed technical resolution to cut back tens of thousands in spending" +
                            " per month while maintaining same capability).",
                            tags: ["Python", "Bash", "DB2"]
                        },
                        {
                            detail: "Script and perform operational tasks such as provisioning, product migration, " +
                            "system upgrades, and deprovisioning.",
                            tags: ["Terminal", "Bash"]
                        }
                    ],
                },
                {
                    title: "BPM Java/Web Software Engineer",
                    interval: [new Date(2016, 0), new Date(2016, 4)],
                    tasks: [
                        {
                            detail: "Reverse engineer large UI components to add accessibility support for the web application.",
                            tags: ["HTML", "CSS", "JS", "Dojo"]
                        },
                        {
                            detail: "Investigate and provide fixes for defects and memory leaks.",
                            tags: ["HTML", "CSS", "JS", "Dojo", "Java", "DB2"]
                        },
                        {
                            detail: "Prototype and experiment with new pre-patented inventions for the web application.",
                            tags: ["HTML", "CSS", "JS", "Dojo"]
                        },
                    ],

                },
                {
                    title: "BWL/BPM Java/Web Developer(Intern)",
                    interval: [new Date(2014, 4), new Date(2015, 11), "(4 mths of part time)"],
                    tasks: [
                        {
                            detail: "Developed REST services to extend the existing REST functionalities of the product.",
                            tags: ["Java", "Junit", "Selenium", "DB2", "Rest"]
                        },
                        {
                            detail: "Designed and implemented a test framework with complete test suits for a software component.\n",
                            tags: ["Java", "DB2", "Rest"]
                        },
                        {
                            detail: "Automated build deployment process from Jenkins to ensure the test server is always on the latest build.\n",
                            tags: ["Python", "Bash"]
                        },
                    ],

                },
            ]
        },]


        scp.skills = {
            "Scripting/OOP": ["Python", "Bash", "Java", "Javascript"],
            "Web Tech": ["Websocket", "Ajax", "ORM", "Restful Services"],
            "Frontend": ["HTML/CSS/JS", "Bootstrap", "Foundation", "jQuery", "Angularjs"],
            "Backend": ["Django", "Nodejs", "Expressjs", "SocketIO", "PHP"],
            // "Database": ["Relational-DB2/MySQL", "NoSql-MongoDB", "Django/Hibernate ORM"],
            // "Version Control" : ["IBM RTC", "Git", "Subversion"]
        };

        scp.to_link = {
            java: "https://www.java.com/en/",
            python: "https://www.python.org/",
            bash: "https://www.gnu.org/software/bash/",
            matlab: "https://www.mathworks.com/",
            mysql: "https://www.mysql.com/",
            postgresql: "https://www.postgresql.org/",
            db2: "https://www.ibm.com/analytics/us/en/technology/db2/",
            mongodb: "https://www.mongodb.com/",
            nodejs: "https://nodejs.org/en/",
            expressjs: "https://expressjs.com/",
            django: "https://www.djangoproject.com/",
            php: "http://php.net/",
            ajax: "https://en.wikipedia.org/wiki/Ajax_(programming)",
            restful: "https://en.wikipedia.org/wiki/Representational_state_transfer",
            "html/css/js": "https://en.wikipedia.org/wiki/Front-end_web_development",
            bootstrap: "http://getbootstrap.com/",
            foundation: "http://foundation.zurb.com/",
            jquery: "https://jquery.com/",
            libgdx: "https://libgdx.badlogicgames.com/",
            terminal: "https://en.wikipedia.org/wiki/Linux",
            html: "https://en.wikipedia.org/wiki/HTML",
            css: "https://en.wikipedia.org/wiki/Cascading_Style_Sheets",
            js: "https://en.wikipedia.org/wiki/JavaScript",
            dojo: "https://dojotoolkit.org",
            junit: "http://junit.org/junit4/",
            rest: "https://en.wikipedia.org/wiki/Representational_state_transfer",
            rtc: "http://www-03.ibm.com/software/products/en/rtc",
            selenium: "http://www.seleniumhq.org",
            angularui: "https://angular-ui.github.io",
            angularjs: "https://angularjs.org",
            djangorestframework: "http://www.django-rest-framework.org",
            "git": "https://git-scm.com/",
            "subversion": "https://subversion.apache.org/",
            "c": "https://en.wikipedia.org/wiki/C_(programming_language)",
            "github": "https://github.com/",
            "bluemix": "https://www.ibm.com/cloud-computing/bluemix",
            "heroku": "https://www.heroku.com/",
        };

        scp.other_skills = [
            "Algorithms", "Data Structures", "OOP", "Data Processing", "ReGex", "Design Patterns", "Multi-Threading", "System Design(UML)", "Database Design", "2D Game Development(libGdx)"
        ];

        scp.education = [
            {
                unique: "uoft_bach",
                name: "University of Toronto",
                logo: "./imgs/education/UofTlogo.png",
                title: "Honours Bachelor of Science",
                interval: [new Date(2011, 8), new Date(2015, 11)],
                Specialist: "Computer Science – Software Engineering",
                CGPA: "3.12/4.0",
                "Awards & Recognitions": "Note Taking Certificate, Queen Elizabeth II Scholarship",
                courses_taken: {
                    CSCD94H3: "Computer Science Project I",
                    CSCD95H3: "Computer Science Project II",
                    CSCD27H3: "Computer & Network Security",
                    CSCD03H3: "Social Impact of Information Technology",
                    CSC401H1: "Natural Language Computation",
                    CSCD01H3: "Engineering Large Software Systems",
                    CSCC69H3: "Operating Systems",
                    CSCC24H3: "Principles of Programming Languages",
                    CSCD43H3: "Database System Technology",
                    CSCC37H3: "Numerical Algorithms for Computational Mathematics",
                    CSCC11H3: "Introduction to Machine Learning & Data Mining",
                    CSCC01H3: "Introduction to Software Engineering",
                    CSC373H1: "Algorithm Design & Analysis",
                    CSC309H1: "Programming on the Web",
                    CSCC43H3: "Introduction to Databases",
                    CSCC63H3: "Computability & Computational",
                    CSCB63H3: "Design & Analysis of Data Structures",
                    CSCB58H3: "Computer Organization",
                    CSCB09H3: "Software Tools & Systems Programming",
                    CSCB07H3: "Software Design",
                    CSCB36H3: "Introduction to the Theory of Computation",
                    CSCA65H3: "Mathematical Expression & Reasoning",
                    CSCA48H3: "Introduction to Computer Science",
                    CSCA08H3: "Introduction to Computer Programming",
                },
            }
        ];


        scp.code_to_link = {};
        for (code in scp.education[0].courses_taken) {
            if (/^[a-zA-Z]{4}/.test(code))
                scp.code_to_link[code] = "https://utsc.calendar.utoronto.ca/course/" + code;
            else
                scp.code_to_link[code] = "http://calendar.artsci.utoronto.ca/crs_csc.htm#" + code
        }

        scp.projects = [
            {
                details: "Tackled many algorithm and data structure related problems from leetcode. 400+ problems as of today. See Github.",
                tags: ["Python", "Git", "Github"],
            },
            {
                details: "Created an end-to-end food ordering system; a responsive web application implemented using \
                the restful approach. This course is a single person project under the supervision of professor Alan Rosselet.",
                tags: ["HTML", "CSS", "JS", "Angular JS", "Angular UI", "Bootstrap", "Django", "Django Rest Framework", "Mysql", "Git", "Bluemix"],
            },
            {
                details: "Created a CRUD Rest Framework for Nodejs with admin interface similar to Django’s; \
                rest endpoints are generated from database schema definitions. This is a single person project under \
                the supervision of professor Alan Rosselet.",
                tags: ["HTML", "CSS", "JS", "Angular JS", "Angular UI", "Foundation", "NodeJS", "Expressjs", "Mongodb", "Git", "Heroku"],
            },
            {
                details: "Created a software to scrape resources of a specific web domain for offline use. See Github.",
                tags: ["Python", "Git", "Github"],
            },
            {
                details: "Altered PostgreSQL's replacement strategy on top of the database engine. Convert from Least Recently \
                Used to Clock, Least Frequently Used, and Most Recently Used Policy. Integrated Bloom Filter into the Join \
                operation for performance improvement. Performance analysis is performed on the implementations.",
                tags: ["C", "PostgreSql"],
            },
            {
                details: "Created Natural Language Processing programs using the Hansard Corpus as training data.\
                Implementations include the word prediction engine, auto-completion engine,\
                language translator(IBM Model 1 algorithm), and tweet author predictor.",
                tags: ["Python", "Matlab"],
            },


        ]

    });
