const cachedModel = {
    model: null,
    loaded: false,
};

export async function predict(board) {
    board = convertToModelBoard(board);
    let input = tf.tensor([board]);
    input.print();
    if (!cachedModel.loaded) {
        await loadModel();

    }

    let prediction = cachedModel.model.predict(input);
    prediction = tf.argMax(prediction.flatten());
    prediction.print();
    return prediction.dataSync();
}
export async function loadModel() {
    const model = await tf.loadLayersModel('XO_model/model.json');
    model.summary();
    cachedModel.model = model;
    cachedModel.loaded = true;
}


function convertToModelBoard(board) {
    let model_board = [0, 0, 0,
        0, 0, 0,
        0, 0, 0,

        0, 0, 0,
        0, 0, 0,
        0, 0, 0]
    
    for(let i = 0; i < 9; i++) {
        if(board[i] == 1) {
            model_board[i] = 1;
        }

        else if(board[i] == -1) {
            model_board[i + 9] = 1;
        }
    }

    return model_board;
}






