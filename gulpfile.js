const {src, dest, watch, series, parallel} = require("gulp");
const prettier = require("gulp-prettier");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const htmlmin = require("gulp-htmlmin");
const browserSync = require("browser-sync").create();
const del = require("del");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const babel = require("gulp-babel");
const sass = require("gulp-sass")(require("sass"));

const formatter = () => {
    return src("src/**/*.{html,js}")
        .pipe(prettier({ singleQuote: true }))
        .pipe(dest("./dist"))
        .pipe(browserSync.stream())
}

const html = () => {
    return src("./src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest("./dist"))
}


const css = () => {
    return src("./dist/styles/*.css")
        .pipe(csso())
        .pipe(dest("./dist/mini-files"))
}


const buildStyles = () => {
    return src("./src/styles/style.scss")
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(prettier({ singleQuote: true }))
        .pipe(dest('./dist/styles'))
}

const jsTransform = () => {
    return src("src/**/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest("./dist"))
}

const js = () => {
    return src("./dist/js/*.js")
        .pipe(terser())
        .pipe(dest("./dist/mini-files"))
}

const img = () => {
    return src("./src/images/*{png,jpg,jpeg,gif,svg}")
        .pipe(imagemin(
            { verbose: true}
        ))
        .pipe(dest("./dist/images"))
}

const fonts = () => {
    return src("./src/fonts/*.{eot,ttf,woff,woff2}")
        .pipe(dest("./dist/fonts"))
}

const server = () => {
    browserSync.init(
        {
            server: {
                baseDir: "./dist"
            }
        }
    )
}

const clear = () => {
    return del("./dist");
}

const watcher = () => {watch("./src/**/*.{html,css,scss,js}", series(fonts, buildStyles, formatter, css, jsTransform, js, img))}

exports.dev = series(
    clear,
    fonts,
    buildStyles,
    formatter,
    css,
    jsTransform,
    js,
    img,
    parallel(watcher, server)
);
