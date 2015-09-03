
var source = './public',
    destination = './build';

module.exports = {
    source:source,
    destination:destination,
    less:{
        files:
        [
            source + '/css/font-awesome.less',
            source + '/css/resum.less',
            source + '/css/print.less'
        ]
    },
    jade:{
        '//':'todo : describe each page with its associated data.',
        files:
            [
                source + '/tpl/index.jade',
                source + '/tpl/skills.jade',
                source + '/tpl/experience.jade',
                source + '/tpl/projects.jade',
                source + '/tpl/about-me.jade'
            ],
        templates:[
            source + '/tpl/inc/menu.jade',
            source + '/tpl/inc/menu.jade'
            ]

    },
    hint:{},
    browserify:{

    },
    ftp:{
        ftphost:  process.env.BLGNET_HOST,
        username: process.env.BLGNET_USER,
        password: process.env.BLGNET_PASS
    }
};