const { src, dest, series, watch } = require(`gulp`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`),
    cssCompressor = require(`gulp-clean-css`),
    cssValidator = require(`gulp-stylelint`),
    jsValidator = require(`gulp-eslint`),
    babel = require(`gulp-babel`),
    jsCompressor = require(`gulp-uglify`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;


let compressHTML = () => {
    return src(`index.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compressCSS = () => {
    return src(`styles/main.css`)
        .pipe(cssCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/styles`));
};

let compressJS = () => {
    return src(`scripts/main.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));
};

let validateCSS = () => {
    return src(`styles/main.css`)
        .pipe(cssValidator({
            failAfterError: true,
            reporters: [
                {formatter: `verbose`, console: true}
            ]
        }));
};

let validateHTML = () => {
    return src(`index.html`)
        .pipe(htmlValidator());
};

let validateJS = () => {
    return src([`scripts/main.js`,`gulpfile.js`])
        .pipe(jsValidator())
        .pipe(jsValidator.formatEach(`compact`, process.stderr));
};

let transpileJSForDev = () => {
    return src(`scripts/main.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};

let transpileJSForProd = () => {
    return src(`scripts/main.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts/main.js`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        server: {
            baseDir: [
                `./`
            ]
        }
    });

    watch(`index.html`).on(`change`, reload);
    watch(`styles/main.css`, validateCSS).on(`change`, reload);
    watch(`scripts/main.js`, series(validateJS, transpileJSForDev)).on(`change`, reload);

};



exports.validateJS = validateJS;
exports.validateHTML = validateHTML;
exports.validateCSS = validateCSS;
exports.transpileJSForDev = transpileJSForDev;
exports.compressHTML = compressHTML;
exports.compressCSS = compressCSS;
exports.compressJS = compressJS;
exports.transpileJSForProd = transpileJSForProd;
exports.serve = series(
    validateCSS,
    validateJS,
    validateHTML,
    transpileJSForDev,
    serve
);
exports.build = series(
    transpileJSForProd,
    compressHTML,
    compressCSS
);
