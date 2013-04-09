({
    baseUrl: "../scripts",
    dir: "../../../deploy/scripts",
    modules: [
        {
            name: "main",
            include : [
                "lib/my_awesome_shared_lib"
            ]
        },
        {
            name : "sections/home/main",
            exclude : [
                "lib/my_awesome_shared_lib"
            ]
        },
        {
            name : "sections/gallery/main",
            exclude : [
                "lib/my_awesome_shared_lib"
            ]
        }
    ]
})