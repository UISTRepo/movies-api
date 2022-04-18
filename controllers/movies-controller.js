exports.index = function (){
    return 'get all';
}

exports.show = function (id){
    return id;
}

exports.store = function (input){
    return 'stored';
}

exports.update = function (input){
    return 'updated';
}

exports.destroy = function (id){
    return 'deleted';
}
