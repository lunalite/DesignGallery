function addCall() {
    let $cell = $('.image__cell');

    // TODO: Very inefficient for removing and adding of click handler.
    $cell.find('.image--basic').off('click').on('click', function () {
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

    $cell.find('.expand__close').off('click').on('click', function () {
        let $thisCell = $(this).closest('.image__cell');
        $thisCell.removeClass('is-expanded').addClass('is-collapsed');
    });
}

function getUrlParameter(sParam) {
    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function loadImages(_page) {
    document.getElementsByClassName("loader")[0].style.display = "block";
    let ajaxData = {
        btnType: getUrlParameter('btnType'),
        color: getUrlParameter('color'),
        text: getUrlParameter('text'),
        category: getUrlParameter('category'),
        sortType: getUrlParameter('sortType'),
        width: getUrlParameter('width'),
        height: getUrlParameter('height'),
        page: _page
    };
    let html = "";
    $.ajax({
        url: "./search",
        type: 'POST',
        data: ajaxData,
        success: function (widgets) {
            if (widgets.length === 0) {
                $("#endPage").removeClass("loader").append("End of Page.");
                $(window).unbind('scroll');
            } else {
                document.getElementsByClassName("loader")[0].style.display = "none";
                for (let i = 0; i < widgets.length; i++) {
                    let btnSize = widgets[i].dimensions['width'] + 'x' + widgets[i].dimensions['height'];
                    html += '<span class="anchor" id="#expand-jump-' + i + '"></span>';
                    html += '<article class="image__cell is-collapsed" id="page-' + _page + '">';
                    html += '<div class="image--basic" style="height:100px">';
                    html += '<a href="#expand-jump-' + i + '">';
                    html += '<img class="basic__img" src="https://storage.googleapis.com/ui-collection-gcs/widgets/' + widgets[i].widget_class + '/' + widgets[i].name + '.jpeg" style="max-height:100px;"/>';
                    html += '</a>';
                    html += '</div>';
                    html += '<div class="arrow--up"></div>';
                    html += '<div class="image--expand">';
                    html += '<div class="modal-body row">';
                    html += '<div class="col-md-5">';
                    html += '<div id="highlight-box">';
                    html += '</div>';
                    let screenSrc = widgets[i].src.split('/');
                    html += '<img class="image--large" src="https://storage.googleapis.com/ui-collection-gcs/' + screenSrc[3] + '/' + screenSrc[4] + '/' + screenSrc[7] + '.jpeg" style="max-height:640px"/>';
                    html += '</div>';
                    html += '<div class="col-md-5 align-self-center">';
                    html += '<table cellpadding="0" cellspacing="0" border="0" class="app-detail">';
                    html += '<tr>';
                    html += '<td><b>Application: </b></td>';
                    html += '<td><a href="' + widgets[i].url + '">';
                    if (!widgets[i].application_name) {
                        html += 'Non-ascii';
                    } else {
                        html += widgets[i].application_name
                    }
                    html += '</a></td>';
                    html += '</tr>';
                    html += '<td><b>Package: </b></td>';
                    html += '<td style="word-break:break-all">' + widgets[i].package_name + '</td>';
                    html += '<tr>';
                    html += '<td><b>Category:</b></td>';
                    html += '<td>' + widgets[i].category + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td><b>Text: </b></td>';
                    html += '<td>' + widgets[i].text + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td><b>Class: </b></td>';
                    html += '<td>' + widgets[i].widget_class + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td><b>Coordinates:&emsp;</b></td>';
                    html += '<td class="coords">[' + widgets[i].coordinates['from'] + '][' + widgets[i].coordinates['to'] + ']</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td><b>Size:</b></td>';
                    html += '<td class="widSize">' + btnSize + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td><b>Color: </b></td>';
                    html += '<td>' + widgets[i].color + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td><b>Downloads:</b></td>';
                    html += '<td>' + widgets[i].downloads + '</td>';
                    html += '</tr>';
                    html += '</table>';
                    html += '</div>';
                    html += '<div>';
                    html += '<a href="#close-jump-' + i + '" class="expand__close"></a>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</article>';

                }
                $(".image-grid").append(html);    // This will be the div where our content will be loaded
                addCall(_page);
            }
        }
    });
}
