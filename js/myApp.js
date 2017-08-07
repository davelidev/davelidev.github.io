angular.module('myApp', [])
    .controller('app', function ($scope) {

        var scp = $scope;

        scp.cur_year = new Date().getFullYear();

        scp.get_from_to = function (from_date, to_date) {
            return to_date ? [from_date, to_date] : from_date
        };

        scp.get_duration = function (from_date, to_date, note) {
            [from_date, to_date] = scp.get_from_to(from_date, to_date);
            var date_display = "";
            var is_carry_over_year = false;
            if (month_diff = (to_date.getMonth() - from_date.getMonth() + 1)) {
                if (month_diff < 0) {
                    month_diff = 12 + month_diff;
                    is_carry_over_year = true;
                }
                date_display += month_diff == 1 ? month_diff + " month " : month_diff + " months "
            }
            if (year_diff = (to_date.getFullYear() - from_date.getFullYear() + (is_carry_over_year ? -1 : 0 )))
                date_display = (year_diff == 1 ? year_diff + " year " : year_diff + " years ") +
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

        scp.get_interval = function (from_date, to_date, note) {
            [from_date, to_date] = scp.get_from_to(from_date, to_date);
            return scp.get_date_pretty(from_date) + " - " + scp.get_date_pretty(to_date)
        };

        scp.get_interval_n_duration = function (from_date, to_date, note) {
            [from_date, to_date] = scp.get_from_to(from_date, to_date);
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
             inspires new ways of handling complicated and repetitive tasks with minimal amount of effort.",
            "What if? This is the question asked by many scientists. I consider myself as an inventor, a mad computer\
            scientist. There're many approaches to tackle one problem, so sometimes I tend to get a little wild on the experimentation.",
            "From experience, I learnt good things take time. I used to get frustrated doing stuff that are not mentally challenging,\
            but eventually most of them turn out to be fun by adding a touch of automation and personalization."

        ];

        scp.experience = [{
            name: "IBM BPM",
            logo: "./imgs/experience/ibm.png",
            interval: [new Date(2014, 4), new Date()],
            positions: [
                {
                    title: "BPM on Cloud Devops",
                    interval: [new Date(2016, 5), new Date()],
                    tasks: [

                        {
                            detail: "Created a thread-safe mechanism and integrated it with applicable automation scripts to \
                                    improve time efficiency by 1500% for better scalability(e.g. reducing production downtime \
                                    for scheduled global product maintenance by leveraging multi-threading).",
                            tags: ["Python", "Bash", "RTC"]
                        },
                        {
                            detail: "Identify and automate operational processes with a self invented workflow engine to cut down \
                                    on execution time and manual effort. Integrated this mechanism with operational processes to \
                                    yield an overall 400% increase in productivity for provisioning, 1000% increase in productivity \
                                    for performing upgrades, 1100% increase in productivity for taking backups and much more.",
                            tags: ["Python", "Bash", "RTC"]
                        },
                        {
                            detail: "Mentor for a new hire; guided and encouraged him to expand on skill set of his interest \
                                    and to build on existing automation.",
                            tags: ["Terminal", "Bash", "RTC"]
                        },
                        {
                            detail: "Create automation scripts for performing different operational procedures to effectively \
                                    reduce time and manual effort.",
                            tags: ["Python", "Bash", "RTC"]
                        },
                        {
                            detail: "Perform system scans and system maintenance to ensure all cloud based customer \
                                    environments have up-to-date dependencies, the latest product version and are compliant \
                                    with the security regulations set by IBM.",
                            tags: ["Terminal", "Bash"]
                        },
                        {
                            detail: "Perform analysis on large amount of data gathered from system scans to support various \
                                    operational decision makings.",
                            tags: ["Python", "Bash", "DB2", "RTC"]
                        },
                    ],
                },
                {
                    title: "BPM Java/Web Software Engineer",
                    interval: [new Date(2015, 8), new Date(2016, 4), "(4 months part time)"],
                    tasks: [
                        {
                            detail: "Reverse engineer large UI components to add accessibility support for the \
                            front-end of the web application.",
                            tags: ["HTML", "CSS", "JS", "Dojo", "RTC"]
                        },
                        {
                            detail: "Investigate and provide fixes for product defects and memory leaks.",
                            tags: ["HTML", "CSS", "JS", "Dojo", "Java", "DB2", "RTC"]
                        },
                        {
                            detail: "Prototype and experiment with new pre-patented inventions for the web application.",
                            tags: ["HTML", "CSS", "JS", "Dojo", "RTC"]
                        },
                    ],

                },
                {
                    title: "BPM Java/Web Developer(Intern)",
                    interval: [new Date(2014, 4), new Date(2015, 7)],
                    tasks: [
                        {
                            detail: "Designed and implemented a test framework with test cases for a software component.",
                            tags: ["Java", "Junit", "Selenium", "DB2", "Rest", "RTC"]
                        },
                        {
                            detail: "Developed rest services to extend the existing rest functionalities.",
                            tags: ["Java", "DB2", "Rest", "RTC"]
                        },
                    ],

                },
            ]
        },]


        scp.skills = {
            "Frontend Web": ["HTML/CSS/JS", "Bootstrap", "Foundation", "jQuery", "Angularjs", "Libgdx"],
            "Server-side": ["Nodejs", "Expressjs", "Django", "PHP", "Ajax", "RESTful"],
            "Scripting/OOP": ["Java", "Python", "Bash", "Matlab"],
            "Database": ["MySQL", "PostgreSQL", "DB2", "Mongodb"],
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
            "Algorithms",
            "Data Structures",
            "Design Patterns",
            "UML Diagrams",
            "Regex",
            "Computer Security",
            "Multi-Threading & Sync. Principles",
            "Natural Language Processing",
            "Basic Data Mining & Machine Learning",
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
                scp.code_to_link[code] = "http://www.utsc.utoronto.ca/~registrar/calendars/calendar/Computer_Science.html#" + code;
            else
                scp.code_to_link[code] = "http://calendar.artsci.utoronto.ca/crs_csc.htm#" + code
        }

        scp.projects = [
            {
                details: "Created an end-to-end food ordering system; a responsive web application implemented using \
                the restful approach. This course is a single person project under the supervision of professor Alan Rosselet.",
                tags: ["HTML", "CSS", "JS", "Angular JS", "Angular UI", "Bootstrap", "Django", "Django Rest Framework", "Mysql", "Git", "Bluemix"],
                info_tags: {},
            },
            {
                details: "Created a CRUD Rest Framework for Nodejs with admin interface similar to Django’s; \
                rest endpoints are generated from database schema definitions. This is a single person project under \
                the supervision of professor Alan Rosselet.",
                tags: ["HTML", "CSS", "JS", "Angular JS", "Angular UI", "Foundation", "NodeJS", "Expressjs", "Mongodb", "Git", "Heroku"],
                info_tags: {},
            },
            {
                details: "Altered PostgreSQL's replacement strategy on top of the database engine. Convert from Least Recently \
         Used to Clock, Least Frequently Used, and Most Recently Used Policy. Integrated Bloom Filter into the Join \
         operation for performance improvement. Performance analysis is performed on the implementations.",
                tags: ["C", "PostgreSql"],
                info_tags: [],
            },
            {
                details: "Tackled many interesting algorithm and data structure related problems on CareerCup. \
         Solutions and test cases are hosted on Github.",
                tags: ["Python", "Git", "Github"],
                info_tags: [],
            },
            {
                details: "Created a program to emulate the functionalities of a database engine using csv files. \
         This program supports various file manipulation operations as well as database operations such as Select, \
         Outer Join, Natural Join, and Order-by.",
                tags: ["Java", "Subversion"],
                info_tags: [],
            },
            {
                details: "Created Natural Language Processing programs using the Hansard Corpus as training data.\
         Implementations include the word prediction engine, autocompletion engine,\
         language translator(IBM Model 1 algorithm), and tweet author predictor.",
                tags: ["Python", "Matlab"],
                info_tags: [],
            },


        ]

    });
