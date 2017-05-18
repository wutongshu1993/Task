/**
 * Created by lh on 2016/10/21.
 */
window.onload = init;
var urlArr1 = ['./img/1.jpg']
var urlArr2 = ['./img/1.jpg','./img/a.jpg'];
var urlArr3 = ['./img/1.jpg','./img/a.jpg','./img/2.jpg'];
var urlArr4 = ['./img/1.jpg','./img/a.jpg','./img/2.jpg','./img/a.jpg'];
var urlArr5 = ['./img/1.jpg','./img/a.jpg','./img/2.jpg','./img/a.jpg','./img/a.jpg'];
var urlArr6 = ['./img/1.jpg','./img/a.jpg','./img/2.jpg','./img/a.jpg','./img/a.jpg','./img/1.jpg'];

var content = getById("content")
function init(){
var piece = createPiece();
    createPicture(urlArr1, piece);
    createPicture(urlArr2, createPiece());
    createPicture(urlArr3, createPiece());
    createPicture(urlArr4, createPiece());
    createPicture(urlArr5, createPiece());
    createPicture(urlArr6, createPiece());
}
function createPiece(){
    var piece = document.createElement("div");
    piece.setAttribute("class", "piece");
    content.appendChild(piece);
    return piece;
}

//y用for循环不能解决问题的时候，可以考虑用call bind apply这三个函数！！！
function createPicture(urlArr,  piece) {
    [].forEach.call(urlArr, function (item, i, array) {
        var img = document.createElement("img");
        img.setAttribute("src", item);
        var classTemp = "type"+array.length+"_"+parseInt(i+1);
        img.setAttribute("class", classTemp);
        piece.appendChild(img);
    })
}
// function createPicture( urlArr,  piece){
//     var len = urlArr.length;
//     switch (len){
//         case 1:
//             var img = document.createElement("img");
//             img.setAttribute("src", urlArr[0]);
//             img.setAttribute("class", "type1")
//             piece.appendChild(img);
//             break;
//         case 2:
//             var img1 = document.createElement("img");
//             img1.setAttribute("src", urlArr[0]);
//             img1.setAttribute("class", "type2_1 item");
//             var img2 = document.createElement("img");
//             img2.setAttribute("src", urlArr[1]);
//             img2.setAttribute("class", "type2_2 item");
//             piece.appendChild(img1);
//             piece.appendChild(img2);
//             break;
//         case 3:
//             var img1 = document.createElement("img");
//             img1.setAttribute("src", urlArr[0]);
//             img1.setAttribute("class", "type3_1");
//             var img2 = document.createElement("img");
//             img2.setAttribute("src", urlArr[1]);
//             img2.setAttribute("class", "type3_2");
//             var img3 = document.createElement("img");
//             img3.setAttribute("src", urlArr[2]);
//             img3.setAttribute("class", "type3_3");
//             piece.appendChild(img1);
//             piece.appendChild(img2);
//             piece.appendChild(img3);
//             break;
//         case 4:
//             /*for(var i = 1; i < 5; i++){
//                 var img = document.createElement("img");
//                 img.setAttribute("src", urlArr[i-1]);
//                 img.setAttribute("class", "type4_"+i);
//                 piece.appendChild(img);
//                 break;
//             }*/
//             var img1 = document.createElement("img");
//             img1.setAttribute("src", urlArr[0]);
//             img1.setAttribute("class", "type4_1");
//             var img2 = document.createElement("img");
//             img2.setAttribute("src", urlArr[1]);
//             img2.setAttribute("class", "type4_2");
//             var img3 = document.createElement("img");
//             img3.setAttribute("src", urlArr[2]);
//             img3.setAttribute("class", "type4_3");
//             var img4 = document.createElement("img");
//             img4.setAttribute("src", urlArr[2]);
//             img4.setAttribute("class", "type4_4");
//             piece.appendChild(img1);
//             piece.appendChild(img2);
//             piece.appendChild(img3);
//             piece.appendChild(img4);
//             break;
//         case 5:
//             var img1 = document.createElement("img");
//             img1.setAttribute("src", urlArr[0]);
//             img1.setAttribute("class", "type5_1");
//             var img2 = document.createElement("img");
//             img2.setAttribute("src", urlArr[1]);
//             img2.setAttribute("class", "type5_2");
//             var img3 = document.createElement("img");
//             img3.setAttribute("src", urlArr[2]);
//             img3.setAttribute("class", "type5_3");
//             var img4 = document.createElement("img");
//             img4.setAttribute("src", urlArr[3]);
//             img4.setAttribute("class", "type5_4");
//             var img5 = document.createElement("img");
//             img5.setAttribute("src", urlArr[4]);
//             img5.setAttribute("class", "type5_5");
//             piece.appendChild(img1);
//             piece.appendChild(img2);
//             piece.appendChild(img3);
//             piece.appendChild(img4);
//             piece.appendChild(img5);
//             break;
//         case 6:
//             var img1 = document.createElement("img");
//             img1.setAttribute("src", urlArr[0]);
//             img1.setAttribute("class", "type6_1");
//             var img2 = document.createElement("img");
//             img2.setAttribute("src", urlArr[1]);
//             img2.setAttribute("class", "type6_2");
//             var img3 = document.createElement("img");
//             img3.setAttribute("src", urlArr[2]);
//             img3.setAttribute("class", "type6_3");
//             var img4 = document.createElement("img");
//             img4.setAttribute("src", urlArr[3]);
//             img4.setAttribute("class", "type6_4");
//             var img5 = document.createElement("img");
//             img5.setAttribute("src", urlArr[4]);
//             img5.setAttribute("class", "type6_5");
//             var img6 = document.createElement("img");
//             img6.setAttribute("src", urlArr[5]);
//             img6.setAttribute("class", "type6_6");
//             piece.appendChild(img1);
//             piece.appendChild(img2);
//             piece.appendChild(img3);
//             piece.appendChild(img4);
//             piece.appendChild(img5);
//             piece.appendChild(img6);
//          break;
//          }
//
//
//
// }
