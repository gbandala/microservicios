//Division function
exports.DivisionInq = function (req, res) {
    var num1 = parseInt(req.params.num1);
    var num2 = parseInt(req.params.num2);
    var result;
    console.log('--------------------------------------------------');    
    console.log(num1);
    console.log(num2);

    if (num1 || num2) {
        console.log(num1 / num2);
        result = num1 / num2;
        console.log('--------------------------------------------------');        
        res.setHeader("Operation", "Division");
        res.setHeader("Status", "OK, parametros validos");
        res.json(result);
    }
};






