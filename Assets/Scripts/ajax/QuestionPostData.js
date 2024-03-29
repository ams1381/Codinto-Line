export let multiple_option_postData = {
    title : null,
    placement : null ,
    question_text : null,
    is_required : false,
    multiple_choice : false,
    is_random_options : false,
    max_selected_options : null,
    min_selected_options : 0,
    additional_options : false,
    media : null,
    show_number : false,
    all_options : false ,
    nothing_selected : false,
    is_vertical : false,
    options : [
        { 
            text : 'گزینه 1' ,
            id : 1
        } , 
        { 
            text : "گزینه 2" , 
            id : 2
         }
    ]
}
export let slider_option_postData = {
    title : null,
    placement : null ,
    question_text : null,
    is_required : false,
    multiple_choice : false,
    double_picture_size : false,
    is_random_options : false,
    max_selected_options : null,
    min_selected_options : null,
    media : null,
    show_number : false,
    all_options : false ,
    nothing_selected : false,
    is_vertical : false,
    options : [
        { 
            text : 'گزینه 1' ,
            id : 1
        } , 
        { 
            text : "گزینه 2" , 
            id : 2
         }
    ]
}
export let range_question_postData = {
    title : null,
    placement : null ,
    question_text : null,
    placement : 4,
    group : null,
    is_required : false,
    show_number : false,
    media : null,
    min : 0,
    max : null,
    min_label : null,
    mid_label : null,
    max_label : null,
}
export let text_question_with_answer_postData  = {
    
    title : null,
    placement : null ,
    question_text : null,
    placement: 12,
    group: null,
    is_required : false,
    show_number : false,
    media : null,
    answer_template: null,
    pattern: 'free',
    min : 0,
    max : null,
};
export let text_question_with_out_answer_postData = {
    title : null,
    placement : null ,
    question_text : null,
    placement: 12,
    group: null,
    show_number : false,
    media : null,
    is_required : false,
    show_number : false,
    button_text : null,
    button_shape : 'round',
    is_solid_button : true,
}
export let welcome_page_postData = {
    title : null,
    placement : null ,
    description : null,
    media : null,
    button_text : null,
    button_shape : 'round',
    is_solid_button : true,
}
export let thank_page_postData  = {
    title : null,
    placement : null ,
    description : null,
    placement: 3,
    group: "",
    share_link: false,
    instagram: false,
    telegram: false,
    whatsapp: false,
    eitaa: false,
    sorush:  false,
    media: null,
};
export let number_question_postData  = {
    title : null,
    placement : null ,
    question_text : null,
    placement: 7,
    group: null,
    is_required : false,
    show_number : false,
    media: null,
    min : 0,
    max : null,
};
export let selective_degree_postData  = {
    title : null,
    placement : null ,
    question_text : null,
    placement: 7,
    group: null,
    is_required : false,
    show_number : false,
    media: null,
    shape : null,
    max : 4
};
export let group_question_postData = {
        title : null,
        placement : null ,
        question_text : null,
        media : null,
        button_text : null,
        button_shape : 'round',
        is_solid_button : true,
        is_required : false,
        show_number : false,
}
export let Questionnaire_PostData = {
    end_date : null,
    timer : null,
    progress_bar : false,
    show_question_in_pages : false ,
    folder : null,
    name :null
};
export let number_question_PostData = {
    title: null,
    question_text: null,
    placement: 7,
    group: "",
    is_required: false,
    show_number: false,
    media: null,
    min: null,
    max: null,
}
export let priority_question_PostData = {
    title: null,
    question_text: null,
    placement: 12,
    is_random_options : false,
    group: "",
    is_required: false,
    show_number: false,
    media: null,
    answer_template: null,
    pattern: 'free',
    options : [
        { 
            text : 'گزینه 1' ,
            id : 1
        } , 
        { 
            text : "گزینه 2" , 
            id : 2
         }
    ]
}
export let email_question_PostData = {
    title: null,
    question_text: null,
    placement: 2,
    is_required: false,
    show_number: false,
    media: null
}
export let link_question_PostData = {
        title: null,
        question_text: null,
        placement: 12,
        group: "",
        is_required: false,
        show_number: false,
        media: null,
}
export let file_question_PostData = {
        title: null,
        question_text: null,
        placement: 3,
        group: "",
        is_required: false,
        show_number: false,
        media: null,
        max_volume : 2,
}