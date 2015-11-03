var bs = require('browser-sync').create();

bs.watch('./app/styles/*.css').on('change', bs.reload);
bs.watch('./app/scripts/*.js').on('change', bs.reload);

bs.init({
    ui: false,
    server: {
        baseDir: ['./app', './node_modules'],
        index: 'index.html',
    },
});
