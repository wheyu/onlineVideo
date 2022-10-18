// ==UserScript==
// @name         wheyu视频
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://wheyu.github.io/*
// @license       MIT License
// @require    https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js
// @grant        GM_xmlhttpRequest

// ==/UserScript==

var searchListData = null;
var detailVideoData = null;

$(function() {

    var css = [
        `body,html{
            height:"100%";
            width:"100%";
        }
        #why_show_btn {
            position: absolute; z-index: 9999; top: 20px; left:40px;
        }

        #video_search_close {
            margin: 2px 2px 0px 0px;
            position: absolute;
            margin-left: -350px;
        }

        #why_search_info {
            border: 1px solid #ccc;
            padding: 7px;
            border-radius: 5px;
            width: 120px;
        }
        #why_search_progress {
            margin-left: 10px; border: 1px solid #ccc;padding: 5px 10px;border-radius: 5px; width: 30px;
            text-align: center;
        }
        `,
    ].join("\n");
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            document.documentElement.appendChild(node);
        }
    }

    $("body").append(`
<div id="why_show_btn">
<svg t="1666085730302" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5349" width="32" height="32"><path d="M630.568421 498.526316l-194.021053-113.178948c-10.778947-8.084211-26.947368 2.694737-26.947368 16.168421v223.663158c0 13.473684 13.473684 21.557895 26.947368 16.168421l194.021053-113.178947c13.473684-8.084211 13.473684-24.252632 0-29.642105z" fill="#10ABFF" opacity=".4" p-id="5350"></path><path d="M935.073684 916.210526H88.926316c-29.642105 0-53.894737-24.252632-53.894737-56.589473V167.073684c0-32.336842 24.252632-59.284211 53.894737-59.28421h843.452631c29.642105 0 53.894737 24.252632 53.894737 56.589473v692.547369c2.694737 32.336842-21.557895 59.284211-51.2 59.28421zM88.926316 145.515789c-8.084211 0-16.168421 10.778947-16.168421 21.557895v692.547369c0 10.778947 8.084211 18.863158 16.168421 18.863158h843.452631c8.084211 0 16.168421-8.084211 16.168421-18.863158V167.073684c0-10.778947-8.084211-18.863158-16.168421-18.863158H88.926316z" fill="#10ABFF" p-id="5351"></path><path d="M245.221053 258.694737H175.157895c-10.778947 0-18.863158-8.084211-18.863158-18.863158s8.084211-18.863158 18.863158-18.863158h70.063158c10.778947 0 18.863158 8.084211 18.863158 18.863158s-8.084211 18.863158-18.863158 18.863158zM444.631579 258.694737h-70.063158c-10.778947 0-18.863158-8.084211-18.863158-18.863158s8.084211-18.863158 18.863158-18.863158h70.063158c10.778947 0 18.863158 8.084211 18.863158 18.863158s-8.084211 18.863158-18.863158 18.863158zM644.042105 258.694737h-70.063158c-10.778947 0-18.863158-8.084211-18.863158-18.863158s8.084211-18.863158 18.863158-18.863158h70.063158c10.778947 0 18.863158 8.084211 18.863158 18.863158s-8.084211 18.863158-18.863158 18.863158zM843.452632 258.694737h-70.063158c-10.778947 0-18.863158-8.084211-18.863158-18.863158s8.084211-18.863158 18.863158-18.863158h70.063158c10.778947 0 18.863158 8.084211 18.863157 18.863158s-8.084211 18.863158-18.863157 18.863158z" fill="#10ABFF" p-id="5352"></path><path d="M245.221053 803.031579H175.157895c-10.778947 0-18.863158-8.084211-18.863158-18.863158s8.084211-18.863158 18.863158-18.863158h70.063158c10.778947 0 18.863158 8.084211 18.863158 18.863158s-8.084211 18.863158-18.863158 18.863158zM444.631579 803.031579h-70.063158c-10.778947 0-18.863158-8.084211-18.863158-18.863158s8.084211-18.863158 18.863158-18.863158h70.063158c10.778947 0 18.863158 8.084211 18.863158 18.863158s-8.084211 18.863158-18.863158 18.863158zM644.042105 803.031579h-70.063158c-10.778947 0-18.863158-8.084211-18.863158-18.863158s8.084211-18.863158 18.863158-18.863158h70.063158c10.778947 0 18.863158 8.084211 18.863158 18.863158s-8.084211 18.863158-18.863158 18.863158zM843.452632 803.031579h-70.063158c-10.778947 0-18.863158-8.084211-18.863158-18.863158s8.084211-18.863158 18.863158-18.863158h70.063158c10.778947 0 18.863158 8.084211 18.863157 18.863158s-8.084211 18.863158-18.863157 18.863158z" fill="#10ABFF" p-id="5353"></path><path d="M428.463158 662.905263c-5.389474 0-13.473684-2.694737-18.863158-5.389474-10.778947-5.389474-18.863158-18.863158-18.863158-32.336842v-223.663158c0-13.473684 8.084211-24.252632 18.863158-32.336842 10.778947-5.389474 24.252632-5.389474 37.726316 0l194.021052 113.178948c10.778947 5.389474 18.863158 18.863158 18.863158 32.336842s-8.084211 24.252632-18.863158 32.336842l-194.021052 113.178947c-8.084211 0-13.473684 2.694737-18.863158 2.694737z m0-261.389474l2.694737 223.663158 188.631579-113.178947-191.326316-110.484211z" fill="#10ABFF" p-id="5354"></path></svg>
</div>
<div id="why_detail_btn" style="position: absolute; z-index: 9999; top: 60px; left:40px;">
<svg t="1666095047423" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4092" width="32" height="32"><path d="M0 0m0 0l1024 0q0 0 0 0l0 1024q0 0 0 0l-1024 0q0 0 0 0l0-1024q0 0 0 0Z" fill="#E8EFF8" p-id="4093"></path><path d="M395.636364 651.636364a23.272727 23.272727 0 0 1 23.272727-23.272728h395.636364a23.272727 23.272727 0 0 1 23.272727 23.272728v116.363636a23.272727 23.272727 0 0 1-23.272727 23.272727H418.909091a23.272727 23.272727 0 0 1-23.272727-23.272727v-116.363636z" fill="#247ADE" p-id="4094"></path><path d="M395.636364 442.181818a23.272727 23.272727 0 0 1 23.272727-23.272727h395.636364a23.272727 23.272727 0 0 1 23.272727 23.272727v116.363637a23.272727 23.272727 0 0 1-23.272727 23.272727H418.909091a23.272727 23.272727 0 0 1-23.272727-23.272727v-116.363637z" fill="#69CB91" p-id="4095"></path><path d="M395.636364 232.727273a23.272727 23.272727 0 0 1 23.272727-23.272728h395.636364a23.272727 23.272727 0 0 1 23.272727 23.272728v116.363636a23.272727 23.272727 0 0 1-23.272727 23.272727H418.909091a23.272727 23.272727 0 0 1-23.272727-23.272727v-116.363636zM302.545455 232.727273a23.272727 23.272727 0 0 0-23.272728-23.272728H162.909091a23.272727 23.272727 0 0 0-23.272727 23.272728v535.272727a23.272727 23.272727 0 0 0 23.272727 23.272727h116.363636a23.272727 23.272727 0 0 0 23.272728-23.272727V232.727273z" fill="#A0BFF7" p-id="4096"></path></svg>
</div>

<div id="why_detail_btn" style="position: absolute; z-index: 9999; top: 80px; left:40px;">
<svg t="1666095047423" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4092" width="32" height="32"><path d="M0 0m0 0l1024 0q0 0 0 0l0 1024q0 0 0 0l-1024 0q0 0 0 0l0-1024q0 0 0 0Z" fill="#E8EFF8" p-id="4093"></path><path d="M395.636364 651.636364a23.272727 23.272727 0 0 1 23.272727-23.272728h395.636364a23.272727 23.272727 0 0 1 23.272727 23.272728v116.363636a23.272727 23.272727 0 0 1-23.272727 23.272727H418.909091a23.272727 23.272727 0 0 1-23.272727-23.272727v-116.363636z" fill="#247ADE" p-id="4094"></path><path d="M395.636364 442.181818a23.272727 23.272727 0 0 1 23.272727-23.272727h395.636364a23.272727 23.272727 0 0 1 23.272727 23.272727v116.363637a23.272727 23.272727 0 0 1-23.272727 23.272727H418.909091a23.272727 23.272727 0 0 1-23.272727-23.272727v-116.363637z" fill="#69CB91" p-id="4095"></path><path d="M395.636364 232.727273a23.272727 23.272727 0 0 1 23.272727-23.272728h395.636364a23.272727 23.272727 0 0 1 23.272727 23.272728v116.363636a23.272727 23.272727 0 0 1-23.272727 23.272727H418.909091a23.272727 23.272727 0 0 1-23.272727-23.272727v-116.363636zM302.545455 232.727273a23.272727 23.272727 0 0 0-23.272728-23.272728H162.909091a23.272727 23.272727 0 0 0-23.272727 23.272728v535.272727a23.272727 23.272727 0 0 0 23.272727 23.272727h116.363636a23.272727 23.272727 0 0 0 23.272728-23.272727V232.727273z" fill="#A0BFF7" p-id="4096"></path></svg>
</div>

<div id="why_detail_btn" style="position: absolute; z-index: 9999; top: 120px; left:40px;">
<svg t="1666095047423" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4092" width="32" height="32"><path d="M0 0m0 0l1024 0q0 0 0 0l0 1024q0 0 0 0l-1024 0q0 0 0 0l0-1024q0 0 0 0Z" fill="#E8EFF8" p-id="4093"></path><path d="M395.636364 651.636364a23.272727 23.272727 0 0 1 23.272727-23.272728h395.636364a23.272727 23.272727 0 0 1 23.272727 23.272728v116.363636a23.272727 23.272727 0 0 1-23.272727 23.272727H418.909091a23.272727 23.272727 0 0 1-23.272727-23.272727v-116.363636z" fill="#247ADE" p-id="4094"></path><path d="M395.636364 442.181818a23.272727 23.272727 0 0 1 23.272727-23.272727h395.636364a23.272727 23.272727 0 0 1 23.272727 23.272727v116.363637a23.272727 23.272727 0 0 1-23.272727 23.272727H418.909091a23.272727 23.272727 0 0 1-23.272727-23.272727v-116.363637z" fill="#69CB91" p-id="4095"></path><path d="M395.636364 232.727273a23.272727 23.272727 0 0 1 23.272727-23.272728h395.636364a23.272727 23.272727 0 0 1 23.272727 23.272728v116.363636a23.272727 23.272727 0 0 1-23.272727 23.272727H418.909091a23.272727 23.272727 0 0 1-23.272727-23.272727v-116.363636zM302.545455 232.727273a23.272727 23.272727 0 0 0-23.272728-23.272728H162.909091a23.272727 23.272727 0 0 0-23.272727 23.272728v535.272727a23.272727 23.272727 0 0 0 23.272727 23.272727h116.363636a23.272727 23.272727 0 0 0 23.272728-23.272727V232.727273z" fill="#A0BFF7" p-id="4096"></path></svg>
</div>
`);


    $("body").append(`
<div id="why_panel" style="display: none;">
<div ></div>
<div id="why_box" style="position: absolute; z-index: 999; top: 0px; left:0px;width: 100%;height: 100%;;align-items: center;justify-content: center ;display: flex; background: #00000085;">
<div id="why_search_box" style="width:400px;height:500px;background: white;border-radius: 5px;filter: drop-shadow(2px 4px 6px black);display: flex;flex-wrap: wrap;justify-content: center;">


<div style="align-items: center;justify-content: center ; display: flex;margin: 10px 0px;font-size: 18px;">
<svg t="1666078714231" id="video_search_close" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7794" width="32" height="32"><path d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667z m-324.693333 373.013334l174.464-174.485334a21.141333 21.141333 0 0 0-0.192-29.973333 21.141333 21.141333 0 0 0-29.973334-0.192l-208.256 208.256a20.821333 20.821333 0 0 0-6.122666 14.976c0.042667 5.418667 2.133333 10.837333 6.314666 14.997333l211.178667 211.2a21.141333 21.141333 0 0 0 29.973333 0.213334 21.141333 21.141333 0 0 0-0.213333-29.973334l-172.629333-172.629333 374.997333 2.602667a20.693333 20.693333 0 0 0 21.034667-21.034667 21.482667 21.482667 0 0 0-21.333334-21.333333l-379.242666-2.624z" fill="#3D3D3D" p-id="7795"></path></svg>
<input id="why_search_info" />
<button id="why_btn" style="margin-left: 10px; border: 1px solid #ccc;padding: 5px 10px;border-radius: 5px; width: 70px;">搜索</button>
<span id="why_search_progress"></span>
</div>

<div class="video_list_panel" style=";background: #9bd0fa36;border-radius: 5px;display: flex;flex-flow: wrap;margin-top: 5px;width: 390px;overflow-y: scroll;height: 430px;justify-content: center;">

<div id="video_list_box" style="margin: 10px 0px;border-radius: 5px;display: flex;flex-flow: wrap;width: 380px;justify-content: center;">

</div>

</div>

</div>
</div>
</div>
`);



    $("body").append(`
<div id="why_detail_panel" style="display: none;">

<div id="why_detail_box" style="position: absolute; z-index: 9998; top: 0px; left:0px;width: 100%;height: 100%;;align-items: center;justify-content: center ;display: flex;">
<div id="why_detail_box" style="width:400px;height:500px;background: white;border-radius: 5px;filter: drop-shadow(2px 4px 6px black);display: flex;flex-wrap: wrap;justify-content: center;">
<svg t="1666078714231" id="video_detail_close" style="margin:2px 2px 0px 0px;position: absolute;margin-left: -360px" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7794" width="32" height="32"><path d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667z m-324.693333 373.013334l174.464-174.485334a21.141333 21.141333 0 0 0-0.192-29.973333 21.141333 21.141333 0 0 0-29.973334-0.192l-208.256 208.256a20.821333 20.821333 0 0 0-6.122666 14.976c0.042667 5.418667 2.133333 10.837333 6.314666 14.997333l211.178667 211.2a21.141333 21.141333 0 0 0 29.973333 0.213334 21.141333 21.141333 0 0 0-0.213333-29.973334l-172.629333-172.629333 374.997333 2.602667a20.693333 20.693333 0 0 0 21.034667-21.034667 21.482667 21.482667 0 0 0-21.333334-21.333333l-379.242666-2.624z" fill="#3D3D3D" p-id="7795"></path></svg>


<div class="video_detail_item" style="width:390px;height:60px;background: white;border-radius: 5px;margin: 5px;">
<div class="video_detail_name" style="margin: 0px 38px;text-align: center;pointer-events: none;font-size: 22px;display: block;max-width: 340px;white-space: nowrap;overflow: hidden;">法国梵蒂冈地方官给</div>
<div style="margin: 6px 0px;">
<span class="video_detail_type" style="margin-left: 13px;margin: 0px 3px;font-size: 14px;border: 2px solid #2196F3;border-radius: 5px;border-radius: 5px;padding: 1px 4px;">爱情片</span>
<span class="video_detail_remark" style="font-size: 14px;margin: 0px 3px;border: 2px solid #FF8F00;border-radius: 5px;border-radius: 5px;padding: 1px 4px;">更新至20221013</span>
<span class="video_detail_time" style="font-size: 14px;margin: 0px 3px;border: 2px solid #81C784;border-radius: 5px;border-radius: 5px;padding: 1px 4px;">2022-10-17 11:51:06</span>
<div class="video_detail_middle" style="height: 300px;width: 360px; margin: 10px 15px;display: flex;">
<image class="video_detail_Pic" style="width: 240px;min-width: 240px;"/>
<div class="video_detail_content" style="overflow: overlay;font-size: 16px;text-align: justify; margin: 0px 5px"></div>
</div>
<div class="video_detail_jishu" style="overflow-y: overlay;flex-wrap: wrap;display: flex;width:390px;height:110px;background: white;border-radius: 5px;margin: 5px;">
</div>
</div>


</div>
</div>
</div>
`);

    $("#video_detail_close").click(function() {
        $("#why_detail_panel").toggle();
    })

    $("#video_search_close").click(function() {
        $("#why_panel").toggle();
    })

    var allUrl = [{
        url: "https://cj.lziapi.com/api.php/provide/vod/",
        name: "量子"
    }, {
        url: "https://www.39kan.com/api.php/provide/vod/at/json",
        name: "39"
    }, {
        url: "https://feisuzy.com//api.php/provide/vod/",
        name: "飞速"
    }, {
        url: "https://api.1080zyku.com/inc/apijson.php",
        name: "1080"
    }, {
        url: "https://api.ukuapi.com/api.php/provide/vod/",
        name: "u酷"
    }]

    var ld1 = localStorage.getItem("searchList")
    var ld2 = localStorage.getItem("detailVideoData")
    var localData = JSON.parse(ld1)
    var localData2 = JSON.parse(ld2)
    if (localData && localData.length > 0) {
        localData.forEach(x => {
            clickSearchListItem(x.rDataObj, x.baseUrl, x.fromName);
        })
    }
    if (localData2 && localData2.list[0]) {
        clickDetailItem(localData2)
    }



    $("#why_detail_btn").click(function() {
        if (localData2.list[0]) {
            $("#why_detail_panel").toggle();
        }
    })

    $("#why_show_btn").click(function() {
        $("#why_panel").toggle();
        //$("#why_detail_panel").toggle();
    })

    　　
    $("#why_btn").click(async function() {
        var searchText = $("#why_search_info").val()
        $("#video_list_box").empty()
        searchListData = [];
        for (let i = 0; i < allUrl.length; i++) {
            var baseUrl = allUrl[i].url
            var fromName = allUrl[i].name
            $("#why_search_progress").text((i + 1) + '/' + allUrl.length)
            await new Promise((res) => {
                GM_xmlhttpRequest({
                    method: "get",
                    url: baseUrl + '?ac=list&wd=' + searchText,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    onload: function(r) {
                        if (r.status == 200) {
                            var rDataObj = JSON.parse(r.response)
                            searchListData.push({ rDataObj, baseUrl, fromName })
                            clickSearchListItem(rDataObj, baseUrl, fromName);
                            res()
                        } else {
                            res()
                        }

                    }

                });
            })
        }

        localStorage.setItem("searchList", JSON.stringify(searchListData))

        　　
    });



    function clickSearchListItem(rDataObj, baseUrl, fromName) {
        rDataObj.list.forEach(data => {
            $("#video_list_box").append(`

<div class="video_list_item" wUrl="${baseUrl + "?ac=detail&ids=" + data.vod_id}" style="white-space: nowrap;padding-left: 6px;width:350px;height:65px;padding-top: 5px;box-shadow: 4px 4px 6px 2px #c4c4c4;border: 1px solid;background: white;border-radius: 5px;margin: 10px 2px;">
<span class="video_item_name" style="pointer-events: none;font-size: 20px;max-width: 300px;display: block;overflow: hidden;">${data.vod_name}</span>
<span class="video_item_from" style="font-size: 14px;border: 2px solid #f18d8dd1;float: right;margin-top: -28px;margin-right: 5px;border-radius: 5px;padding: 1px 4px;">${fromName}</span>
<div style="pointer-events: none;margin: 6px 0px;">
<span class="video_item_type" style="font-size: 14px;border: 2px solid #2196F3;border-radius: 5px;border-radius: 5px;padding: 1px 4px;">${data.type_name}</span>
<span class="video_item_remark" style="font-size: 14px;border: 2px solid #FF8F00;border-radius: 5px;border-radius: 5px;padding: 1px 4px;">${data.vod_remarks}</span>
<span class="video_item_time" style="font-size: 14px;border: 2px solid #81C784;border-radius: 5px;border-radius: 5px;padding: 1px 4px;">${data.vod_time}</span>
</div>
</div>
`)
        })



        $(".video_list_item").click(function(item) {
            var searchUrl = $(item.target).attr("wUrl")
            GM_xmlhttpRequest({
                method: "get",
                url: searchUrl,
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                onload: function(res) {

                    if (res.status == 200) {
                        var detailObj = JSON.parse(res.response)
                        clickDetailItem(detailObj)
                        $("#why_detail_panel").show();
                        localStorage.setItem("detailVideoData", res.response)
                    }
                }
            });
        });




    }

    function clickDetailItem(detailObj) {
        $(".video_detail_jishu").empty()
        if (detailObj.list[0]) {
            var videoDetailObj = detailObj.list[0]
            $(".video_detail_name").text(videoDetailObj.vod_name)
            $(".video_detail_type").text(videoDetailObj.type_name)
            $(".video_detail_remark").text(videoDetailObj.vod_remarks)
            $(".video_detail_time").text(videoDetailObj.vod_time)
            $(".video_detail_content").text(videoDetailObj.vod_blurb) //video_detail_Pic
            $(".video_detail_Pic").attr('src', videoDetailObj.vod_pic)
            var playInfo = videoDetailObj.vod_play_url
            var list1 = playInfo.split("$$$")
            list1.forEach(l1 => {
                var list2 = l1.split("#");
                list2.forEach(l2 => {
                    var name_url = l2.split("$")
                    if (/\.m3u8$/g.test(name_url[1])) {
                        $(".video_detail_jishu").append(`
    <div class="video_detail_Url_item" vUrl="${name_url[1]}" style="box-shadow: 4px 4px 6px 2px #c4c4c4;border: 1px solid;background: white;border-radius: 5px;margin: 4px 4px;padding: 0px 2px;height: 29px;display: flex;align-items: center;">
    <span class="video_item_name" style="pointer-events: none;font-size: 16px;height: 18px;">${name_url[0]}</span>
    </div>
    </div>
    `)

                        $(".video_detail_Url_item").click(function(item) {
                            var vUrl = $(item.target).attr("vUrl")
                            window.location.href = "https://wheyu.github.io/onlineVideo/?videoUrl=" + vUrl
                                // $("#outUrl1").remove()
                                // $("body").append(`
                                // <iframe id="outUrl1" src="https://lziplayer.com/?url=${vUrl}">
                                // </iframe>
                                // `)
                        })
                    }


                })
            })
        }


    }

});