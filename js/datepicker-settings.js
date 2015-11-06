var datepicker = {
    data: {},
    init: function() {
        datepicker.arrivalDate.handler();
        datepicker.departureDate.handler();
        datepicker.hoverHandler();
        datepicker.preventDefault();
        datepicker.openCalendarOnIconClick();
    },
    preventDefault: function() {
        jQuery(document).on('click', '.ui-state-default', function(event){
            event.preventDefault();
        })
    },
    openCalendarOnIconClick: function() {
        jQuery('.icon-cal').click(function(){
            var datepicker = jQuery(this).parent().find('input');
            datepicker.datepicker('show');
        });
    },
    convertDateToDayNumber: function(date) {
        var timestmp = new Date().setFullYear(new Date().getFullYear(), 0, 1);
        var yearFirstDay = Math.floor(timestmp / 86400000);
        var today = Math.ceil((new Date(date)) / 86400000);
        var dayOfYear = today - yearFirstDay;
        return dayOfYear;
    },
    arrivalDate: {
        handler: function(class_name, dateformat) {
            class_name = class_name || ".arrivaldate";
            dateformat = dateformat || "dd-mm-yy";

            jQuery(class_name).datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
                dateFormat: dateformat,
                beforeShowDay: datepicker.arrivalDate.beforeShowDayHandler,
                onClose: datepicker.arrivalDate.onCloseHandler,
                onSelect: datepicker.arrivalDate.onSelectHandler
            });
        },
        beforeShowDayHandler: function(date) {

            var formatted_date = jQuery.datepicker.formatDate('yy-mm-dd', new Date(date));
            var now = new Date(); //this gets the current date and time
            var id = jQuery(this).attr('id');
            datepicker.data.arrivalid = id;

            if (!jQuery.isEmptyObject(datepicker.data.content) && jQuery.inArray(formatted_date, datepicker.data.content) > -1)
                return [true, 'dp-highlight dp-id-' + id + ' dp-' + datepicker.convertDateToDayNumber(date), 'tooltip text'];
            if (date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth() && date.getDate() >= now.getDate())
                return [true, 'dp-id-' + id + ' dp-' + datepicker.convertDateToDayNumber(date)];
            if (date.getFullYear() >= now.getFullYear() && date.getMonth() > now.getMonth())
                return [true, 'dp-id-' + id + ' dp-' + datepicker.convertDateToDayNumber(date)];
            if (date.getFullYear() > now.getFullYear())
                return [true, 'dp-id-' + id + ' dp-' + datepicker.convertDateToDayNumber(date)];
            return [false, 'dp-id-' + id + ' dp-' + datepicker.convertDateToDayNumber(date)];
        },
        onSelectHandler: function(date) {
            datepicker.data.content = {};
            var start = jQuery(this).datepicker("getDate");
            var end = (jQuery('.departuredate').datepicker("getDate") === null ? datepicker.data.departuredate : jQuery('.departuredate').datepicker("getDate"));
            var currentDate = new Date(start);
            var between = [];

            while (currentDate <= end) {
                var current_date = jQuery.datepicker.formatDate('yy-mm-dd', new Date(currentDate));
                between.push(current_date);
                currentDate.setDate(currentDate.getDate() + 1);
            }

            datepicker.data.content = between;
            datepicker.data.arrivaldate = jQuery(this).datepicker("getDate");

            return false;
        },
        onCloseHandler: function(selectedDate, inst) {
            var position = jQuery(this).attr('position');

            jQuery(".departuredate").datepicker("option", "minDate", selectedDate);
            jQuery(".departuredate[position='" + position + "']").datepicker('show');
            jQuery(".departuredate[position='" + position + "']").refresh();
            return false;
        }
    },
    departureDate: {
        handler: function(class_name, dateformat) {
            class_name = class_name || ".departuredate";
            dateformat = dateformat || "dd-mm-yy";

            jQuery(class_name).datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
                dateFormat: dateformat,
                beforeShowDay: datepicker.departureDate.beforeShowDayHandler,
                onSelect: datepicker.departureDate.onSelectHandler
            });
        },
        beforeShowDayHandler: function(date) {
            var formatted_date = jQuery.datepicker.formatDate('yy-mm-dd', new Date(date));
            var id = jQuery(this).attr('id');
            datepicker.data.departureid = id;

            if (!jQuery.isEmptyObject(datepicker.data.content) && jQuery.inArray(formatted_date, datepicker.data.content) > -1) {
                return [true, 'dp-id-' + id + ' dp-highlight dp-' + datepicker.convertDateToDayNumber(date), 'tooltip text'];
            } else {
                // default
                return [true, 'dp-id-' + id + ' dp-' + datepicker.convertDateToDayNumber(date), ''];
            }
        },
        onSelectHandler: function(date) {
            datepicker.data.content = {};
            var start = (jQuery('.arrivaldate').datepicker("getDate") === null ? datepicker.data.arrivaldate : jQuery('.arrivaldate').datepicker("getDate"));
            var end = jQuery(this).datepicker("getDate");
            var currentDate = new Date(start);
            var between = [];

            while (currentDate <= end) {
                var formatted_current_date = jQuery.datepicker.formatDate('yy-mm-dd', new Date(currentDate));
                between.push(formatted_current_date);
                currentDate.setDate(currentDate.getDate() + 1);
            }

            datepicker.data.content = between;
            datepicker.data.departuredate = jQuery(this).datepicker("getDate");
        }
    },
    hoverHandler: function() {
        jQuery("html").on("mouseover", ".ui-state-default", function() {

            var c1 = jQuery(this).closest('.ui-datepicker');
            var day1 = jQuery(this).text();
            var month1 = (parseInt(jQuery(this).parent().attr('data-month')) + 1);
            var year1 = c1.find('.ui-datepicker-year').text();
            var fullDate = month1 + "-" + day1 + "-" + year1;
            var fullDate2 = jQuery.datepicker.formatDate('yy-mm-dd', new Date(fullDate));

            var hovdate = datepicker.convertDateToDayNumber(fullDate2);


            if (jQuery(this).closest('td').hasClass("dp-id-" + datepicker.data.arrivalid)) {
                var selectedDep = (jQuery('.departuredate').datepicker("getDate") === null ? datepicker.data.departuredate : jQuery('.departuredate').datepicker("getDate"));
                var seldep = datepicker.convertDateToDayNumber(selectedDep);
                var total = (seldep - hovdate);
                if (hovdate < seldep) {
                    jQuery('.ui-state-default').closest('td').removeClass('dp-highlight');
                    for (i = 0; i < (total + 1); i++) {
                        jQuery('.dp-' + (hovdate + i)).addClass('dp-highlight');
                    }
                }
            }

            if (jQuery(this).closest('td').hasClass("dp-id-" + datepicker.data.departureid)) {
                var selectedDep = (jQuery('.arrivaldate').datepicker("getDate") === null ? datepicker.data.arrivaldate : jQuery('.arrivaldate').datepicker("getDate"));
                var seldep = datepicker.convertDateToDayNumber(selectedDep);
                var total = (hovdate - seldep);

                if (hovdate > seldep) {
                    jQuery('.ui-state-default').closest('td').removeClass('dp-highlight');
                    for (i = 0; i < (total + 1); i++) {
                        jQuery('.dp-' + (seldep + i)).addClass('dp-highlight');
                    }
                }
            }
        });
    }
};

jQuery(document).ready(function() {
    datepicker.init();
});
