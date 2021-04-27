// 使用する画面要素の取得
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// 写真データを持つ配列を定義
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];


// unsplash api関連の設定
const count = 10;
const apiKey = "75da89JsifM8UwM9M73wpHIGoFIYAzRi0CGi12UyD9M";
// ランダムな画像をcount分取得する
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// イメージの読み込みが終わったかどうかをチェックする
function imageLoaded() {
    // ロードが終わったらカウントアップする
    imagesLoaded++;
    console.log('image loaded', imagesLoaded);

    // ロードした数と、全体の数が等しければロード完了
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready = ', ready);
    }
}


// helper function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    };
}

function displayPhoto() {
    // ロードしたイメージの枚数の初期化
    imagesLoaded = 0;

    // 取得した画像の枚数
    totalImages = photoArray.length;
    console.log('totalImages = ', totalImages);

    photoArray.forEach((photo) => {
        // create <a> to link to unsplash Image
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // ロードが終わったかどうかをチェックする
        img.addEventListener('load', imageLoaded);

        // add <img> to <a>
        item.appendChild(img);
        // add <a> to imageContainer
        imageContainer.appendChild(item);

    });
}

// unsplash APIで写真を取得する関数
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhoto();
    } catch (error) {
        // write error processing here
    }
}

// スクロールが下に達する前に、もう一度getPhotos関数を呼び出す
window.addEventListener('scroll', () => {
    // このしきの意味は、動画参照。
    // Y方向にスクロールした分　＋　ウィンドウの高さ　が実際に下に進んだ距離
    // document.body.offsetHeightは要素全ての高さ(画面に表示されてない分も含む)で、それから1000(これは任意の値)を陽いいているのは、一番下に達する前に、もう一度読み込みをしたいから。
    if ((window.scrollY + window.innerHeight) >= (document.body.offsetHeight - 1000) && ready) {
        console.log('load more');
        getPhotos();
        ready = false;
    }
});

// on load
getPhotos();
