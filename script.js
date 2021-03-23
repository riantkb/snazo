function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--){
        let r = Math.floor(Math.random() * (i + 1));
        let tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }
}


function get_sorted_input() {
    let str = document.getElementById('input').value.replaceAll(' ', '').replaceAll('　', '').replaceAll('\n', '');
    let arr = Array.from(str);
    arr.sort();
    return arr.join('');
};

function process_input(inp, ans) {
    let cnt = {};
    for (const c of ans) {
        if (c === ' ') {
            continue;
        }
        if (!(c in cnt)) {
            cnt[c] = 0;
        }
        ++cnt[c];
    }
    let res = "";
    for (const c of inp) {
        if (c in cnt && cnt[c] > 0) {
            res += `<span style="background-color:#999999">${c}</span>`;
            --cnt[c];
        }
        else {
            res += c;
        }
    }
    return res;
}

function get_input_rem(inp, ans) {
    let cnt = {};
    for (const c of ans) {
        if (c === ' ') {
            continue;
        }
        if (!(c in cnt)) {
            cnt[c] = 0;
        }
        ++cnt[c];
    }
    let res = "";
    for (const c of inp) {
        if (c in cnt && cnt[c] > 0) {
            --cnt[c];
        }
        else {
            res += c;
        }
    }
    return Array.from(res);
}


function process_answer(inp, ans) {
    let cnt = {};
    for (const c of inp) {
        if (!(c in cnt)) {
            cnt[c] = 0;
        }
        ++cnt[c];
    }
    let res = ""
    for (const c of ans) {
        if (c === ' ') {
            res += c;
        }
        else if (c in cnt && cnt[c] > 0) {
            res += `<span style="background-color:#BBFFFF">${c}</span>`;
            --cnt[c];
        }
        else if (c in cnt) {
            res += `<span style="background-color:#DDDDFF">${c}</span>`;
        }
        else {
            res += `<span style="background-color:#FFBBFF">${c}</span>`;
        }
    }
    return res;
}

function display_result() {
    let inp = get_sorted_input();
    let ans = document.getElementById('answer').value.replaceAll('　', ' ').replaceAll('\n', ' ');
    let res = `<p>${process_input(inp, ans)}</p><p>${process_answer(inp, ans)}</p>`;
    document.getElementById('result').innerHTML = res;
};

function generate_shuffles() {
    let count = Number(document.getElementById('shuffle_count').value);
    let arr = Array.from(get_sorted_input());
    if (document.getElementById('shuffle_part').checked) {
        let inp = get_sorted_input();
        let ans = document.getElementById('answer').value.replaceAll('　', ' ').replaceAll('\n', ' ');
        arr = get_input_rem(inp, ans);
    }
    let res = ""
    for (let i = 0; i < count; i++) {
        shuffle(arr)
        res += arr.join('') + '\n'
    }
    document.getElementById('shuffle_result').innerText = res;
}

document.getElementById('input').addEventListener('input', display_result);
document.getElementById('answer').addEventListener('input', display_result);
document.getElementById("shuffle_button").addEventListener('click', generate_shuffles);
