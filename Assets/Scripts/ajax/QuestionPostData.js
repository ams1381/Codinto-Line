export const multiple_option_postData = {
    title : null,
    question_text : null,
    is_required : false,
    multiple_choice : false,
    is_random_options : false,
    max_selected_options : null,
    min_selected_options : null,
    additional_options : false,
    media : null,
    show_number : false,
    all_options : false ,
    nothing_selected : false,
    is_vertical : false,
    options : [
        { text : 'گزینه 1' },
        { text : 'گزینه 2'}
    ]
}
export const slider_option_postData = {
    title : null,
    question_text : null,
    is_required : false,
    multiple_choice : false,
    is_random_options : false,
    max_selected_options : null,
    min_selected_options : null,
    media : null,
    show_number : false,
    all_options : false ,
    nothing_selected : false,
    is_vertical : false,
    options : [
        { text : 'گزینه 1' },
        { text : 'گزینه 2'}
    ]
}
export const range_question_postData = {
    title : null,
    question_text : null,
    question_type :  null,
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
export const text_question_with_answer_postData  = {
    
    title : null,
    question_text : null,
    placement: 12,
    question_type : "text_answer",
    group: null,
    is_required : false,
    show_number : false,
    media : null,
    answer_template: null,
    pattern: 'free',
    min : 0,
    max : null,
};
export const welcome_page_postData = {
    title : null,
    description : null,
    media : null,
    button_text : null,
    button_shape : 'round',
    is_solid_button : true,
}
export const thank_page_postData  = {
    title : null,
    question_text : null,
    placement: 3,
    group: "",
    share_link: null,
    instagram: false,
    telegram: false,
    whatsapp: false,
    eitaa: false,
    sorush:  false,
    media: null,
};
export const number_question_postData  = {
    title : null,
    question_text : null,
    question_type : "Number answer",
    placement: 7,
    group: null,
    is_required : false,
    show_number : false,
    media: null,
    min : 0,
    max : null,
};
export const selective_degree_postData  = {
    title : null,
    question_text : null,
    question_type : "Number answer",
    placement: 7,
    group: null,
    is_required : false,
    show_number : false,
    media: null,
    shape : null,
    max : 4
};
export const Questionnaire_PostData = {
    pub_date : null,
    end_date : null,
    timer : null,
    progress_bar : false,
    show_question_in_pages : false ,
    folder : null
    
};