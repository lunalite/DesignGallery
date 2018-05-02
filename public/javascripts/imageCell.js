function addCall() {
    let $cell = $('.image__cell');

    $cell.find('.image--basic').click(function () {
        let $thisCell = $(this).closest('.image__cell');

        if ($thisCell.hasClass('is-collapsed')) {
            $cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed');
            $thisCell.removeClass('is-collapsed').addClass('is-expanded');
            let coords = $thisCell.find('.coords').html();
            let coordReg = /\[(\d+),(\d+)]/g;
            let coordRes = coordReg.exec(coords);
            let widSize = $thisCell.find('.widSize').html();
            let widReg = /(\d+)x(\d+)/g;
            let widRes = widReg.exec(widSize);

            let width = $thisCell.find('.image--large')[0].clientWidth;
            let ratio = width / 800;
            let _left = parseInt(coordRes[1]) * ratio + 10;
            let _top = parseInt(coordRes[2]) * ratio - 5;
            let _height = parseInt(widRes[2]) * ratio;
            let _width = parseInt(widRes[1]) * ratio;

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
}