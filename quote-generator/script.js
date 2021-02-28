// 操作対象のDOMの取得
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// ローティング中
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// ローディング完了
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


// get quote from api
async function getQuote() {
    // 処理が終わるまでローディングする
    loading();

    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const apiUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // quoteの作者が空だったら、nuknownにセットする
        if (data.quoteAuthor === "" ) {
            authorText.innerText = "unknown";
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        // quoteの長さが120文字以上だったら、font-sizeを小さくする
        if (data.quoteText.length > 120) {
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;

        // 処理が終わったので、ローディングを終了する
        complete();

    } catch (error) {
        // quoteにパースできない文字列が入っている場合があるので、再取得する
        getQuote();
    }

}

// quoteを初期値に設定して、twitterページを開く関数
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

// イベントリスナーの追加
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuote);

getQuote();
