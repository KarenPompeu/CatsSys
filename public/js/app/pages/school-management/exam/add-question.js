/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['jquery', 'datatable'], function () {
    var addQuestion = (function () {
        //  Tipos de questão
        var CLOSED_QUESTION = "1";
        var OPEN_QUESTION = "2";
        var preview = null;

        initPageItems = function () {
            // Botões Adiciona/Remove alternativa
            var btnGroup = ''
                    + '<div class="btn-group btn-group-justified" role="group" id="alternative-control-btns">'
                    + '<div class="btn-group" role="group">'
                    + '<button type="button" id="add-alternative-btn" class="btn btn-success" onclick="return addQuestionAlternativeBtn()">Adicionar Alternativa</button>'
                    + '</div>'
                    + '<div class="btn-group" role="group">'
                    + '<button type="button" id="remove-alternative-btn" class="btn btn-danger" onclick="return removeQuestionAlternativeBtn()" onclick="return addQuestionAlternativeBtn()">Remover Alternativa</button>'
                    + '</div>'
                    + '</div>';
            $('#alternatives-fieldset').after(btnGroup + '<br><br>');

            // Impede que o usuário selecione o tipo de questão como aberta se 
            // houver ao menos um campo de alternativas
            $("#question-type").change(function () {
                if ($("#question-type").val() === OPEN_QUESTION) {
                    if ($('#alternatives-fieldset > fieldset').length > 0) {
                        $("#question-type").val(CLOSED_QUESTION);
                    } else {
                        $("#alternative-control-btns").hide();
                    }
                } else {
                    $("#alternative-control-btns").show();
                }
            });
        };

        addQuestionAlternativeBtn = function () {
            if ($("#question-type").val() === CLOSED_QUESTION) {
                var currentCount = $('#alternatives-fieldset > fieldset').length;
                var template = $('#alternatives-fieldset span').data('template');
                template = template.replace(/__placeholder__/g, currentCount);
                template = template.replace("Alternativa 1", "Alternativa " + (currentCount + 1));
                $('#alternatives-fieldset').append(template);
            }
        };

        removeQuestionAlternativeBtn = function () {
            if ($("#question-type").val() === CLOSED_QUESTION && $('#alternatives-fieldset > fieldset').length > 0) {
                $('#alternatives-fieldset fieldset').last().remove();
            }
        };

        initPreview = function () {

            var value = "";
            $("#add-exam-question").on("keyup", "textarea", function () {
                $("#add-exam-question").find("textarea").each(function (e) {
                    if (e === 0) {
                        value = "<h4>Questão <h4>";
                        value += $(this).val();
                        value += "<hr>";
                        value += "<ol type='A' class='text-center'>";
                    } else {
                        value += "<li>" + $(this).val();
                        +"</li>";
                    }
                });
                if (value !== "") {
                    value += "</ol>";
                }

                preview.setInputValue(value);
                preview.Update();
                value = "";
            });
        };


        initMathJax = function () {
            require(['mathjax'], function () {
                setTimeout($("#testEquation").fadeIn("slow"), 1000);
                require(['app/models/MathJaxPreview'], function (Preview) {
                    preview = Preview;
                    preview.Init();
                    initPreview();
                });
            });
        };



        return {
            init: function () {
                initPageItems();
                initMathJax();
            }
        };

    }());

    return addQuestion;
});