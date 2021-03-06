/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['moment', 'masks', 'jquery', 'datetimepicker'], function (moment, masks) {
    var create = (function () {

        initDatepickers = function () {

            $('.datepicker').closest('.input-group').datetimepicker({
                format: 'DD/MM/YYYY',
                minDate: moment(),
                useCurrent: false,
                maxDate: moment().add(18, 'months'),
                locale: 'pt-br',
                viewMode: 'years',
                viewDate: moment()
            });
        };

        initMasks = function () {
            masks.bind({
                date: "input[name='recruitment_begindate'], input[name='recruitment_enddate']"
            });
        };

        return {
            init: function () {
                initDatepickers();
                initMasks();
            }
        };

    }());

    return create;
});
