$('document').ready(function () {
    let $cell = $('.image__cell');

    $cell.find('.image--basic').click(function () {
        let $thisCell = $(this).closest('.image__cell');

        if ($thisCell.hasClass('is-collapsed')) {
            $cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed');
            $thisCell.removeClass('is-collapsed').addClass('is-expanded');

            let width = $thisCell.find('.image--large')[0].clientWidth;
            let ratio = width / 800;
            console.log(ratio);
            let cssDetail = $thisCell.find('#highlight-box').css(['left', 'top', 'width', 'height']);
            let _left = parseInt(cssDetail['left'].replace(/px/g, '')) * ratio + 10;
            let _top = parseInt(cssDetail['top'].replace(/px/g, '')) * ratio -5;
            let _height = parseInt(cssDetail['height'].replace(/px/g, '')) * ratio;
            let _width = parseInt(cssDetail['width'].replace(/px/g, '')) * ratio;
            let styles = {
                position: 'absolute',
                left: _left,
                top: _top,
                width: _width,
                height: _height,
                border: "5px solid red"
            };
            $thisCell.find('#highlight-box').css(styles)
        } else {
            $thisCell.removeClass('is-expanded').addClass('is-collapsed');
        }
    });

    $cell.find('.expand__close').click(function () {
        let $thisCell = $(this).closest('.image__cell');
        $thisCell.removeClass('is-expanded').addClass('is-collapsed');
    });
});