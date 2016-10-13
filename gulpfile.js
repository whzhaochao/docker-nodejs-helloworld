var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('default', function () {
    // 将你的默认的任务代码放在这
    gulp.start('help');
});


gulp.task('uglify', function () {
    return gulp.src('public/ckplayer/ckplayer.js')
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dest'));  //输出
});

// 说明

gulp.task('help', function () {
    console.log('gulp build	文件打包');
    console.log('gulp watch	文件监控打包');
    console.log('gulp help gulp参数说明');
    console.log('gulp server 测试server');
    console.log('gulp -p 生产环境（默认生产环境）');
    console.log('gulp -d 开发环境');
    console.log('gulp -m <module> 部分模块打包（默认全部打包）');
});


// 构建视图文件-build版本
gulp.task('build:views', ['clean:views'], function() {
    return streamqueue({ objectMode: true },
        gulp.src(config.commonSrc, { base: 'src' }),
        gulp.src(config.layoutsSrc, { base: 'src' }),
        gulp.src(config.pagesSrc, { base: 'src/pages' }),
        gulp.src(config.componentsSrc, { base: 'src' })
    )
        .pipe(plumber(handleErrors))
        .pipe(logger({ showChange: true }))
        .pipe(preprocess({ context: { PROJECT: project } }))
        .pipe(gulpif(function(file) {
            if (file.path.indexOf('.html') != -1) {
                return true;
            } else {
                return false;
            }
        }, htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true,
            ignoreCustomFragments: [/<%[\s\S]*?%>/,
                /<\?[\s\S]*?\?>/,
                /<meta[\s\S]*?name="viewport"[\s\S]*?>/]
        })))
        .pipe(gulp.dest(config.dest));
});