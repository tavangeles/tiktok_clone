module.exports = {  
    session: {
        secret: "sessionsecret",
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    },
    
    database: {
        host: "localhost",
        user: "root",
        password: "admin",
        database: "job_search",
    },

    clientUrl: "http://localhost:3000",
    viewEngine: "ejs",
    viewsFolder: "/Views/",
    assetsFolder: "/Assets",
    
    port: 8000,

    enableProfiler: true,
}