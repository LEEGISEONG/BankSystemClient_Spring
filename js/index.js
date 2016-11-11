function searchAllMember() {
    $.ajax({
        // url : 서버 프로그램의 url
        url: "http://localhost:7070/bank/selectAllMember",
        // dataType : 만약 jsonp방식으로 사용할꺼면반드시 jsonp
        dataType: "jsonp",
        // 만약 jsonp방식을 이용하면 반드시 jsonp 속성이 나와야해요
        jsonp: "callback",
        // 만약 전달할 데터가 있으면 데이터를 넣어주어요!
        // 3초만 기다릴 꺼에요 (하염없이 기다리기 싫어요)
        timeout: 3000,
        success: function (result) {
            $("#memberAll").empty();

            for (var i = 0; i < result.length; i++) {
                var tr = $("<tr></tr>");
                var memberid = $("<td></td>").text(result[i].memberId);
                var memberName = $("<td></td>").text(result[i].memberName);
                var memberAccount = $("<td></td>").text(result[i].memberAccount);
                var memberBalance = $("<td></td>").text(result[i].memberBalance);
                tr.append(memberid);
                tr.append(memberName);
                tr.append(memberAccount);
                tr.append(memberBalance);
                $("#memberAll").append(tr);
            }
        },
        error: function () {
            // 실패하면 호출
            alert("서버호출실패")
        }
    });
}

function searchMember() {
    var id = $("#memberId").val();
    if (event.keyCode == 13) {
        $.ajax({
            url: "http://localhost:7070/bank/search",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                memberId: id
            },
            timeout: 3000,
            success: function (result) {
                $("#memberDetail").empty();

                for (var i = 0; i < result.length; i++) {
                    console.log(i)
                    var tr = $("<tr></tr>");
                    var memberid = $("<td></td>").text(result[i].memberId);
                    var memberName = $("<td></td>").text(result[i].memberName);
                    var memberAccount = $("<td></td>").text(result[i].memberAccount);
                    var memberBalance = $("<td></td>").text(result[i].memberBalance);
                    tr.append(memberid);
                    tr.append(memberName);
                    tr.append(memberAccount);
                    tr.append(memberBalance);

                    $("#memberDetail").append(tr);
                }
            },
            error: function () {
                // 실패하면 호출
                alert("서버호출실패")
            }
        });
    }
}
function inputBalance() {

    var id = $("#depositMemberId").val();
    var money = $("#depositMemberBalance").val();

    $.ajax({
        url: "http://localhost:7070/bank/deposit",
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            memberID: id,
            memberBalance: money
        },
        success: function () {
            alert("입금성공")

        },
        error: function () {
            alert("서버호출 실패")
        }

    });
}

function withrawBalance() {

    var id = $("#withdrawMemberId").val();
    var money = $("#withdrawMemberBalance").val();

    $.ajax({
        url: "http://localhost:7070/bank/withdraw",
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            memberID: id,
            memberBalance: money
        },
        success: function (result) {
            if(result)
                alert("출금성공")
            else
                alert("잔액부족")

        },
        error: function () {
            alert("서버호출 실패")
        }

    });
}
function transferBalance() {

    var sendMemberId = $("#sendMemberId").val();
    var receiveMemberId = $("#receiveMemberBalance").val();
    var transferBalance = $("#transferBalance").val();

    $.ajax({
        url: "http://localhost:7070/bank/transfer",
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            sendMemberId: sendMemberId,
            receiveMemberId: receiveMemberId,
            transferBalance: transferBalance
        },
        success: function (result) {
            if (result)
                alert("이체성공")
            else
                alert("잔액부족")

        },
        error: function () {
            alert("서버호출 실패")
        }

    });
}
function checkMember() {

    var id = $("#checkMemberId").val();

    $.ajax({
        url: "http://localhost:7070/bank/inquiry",
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            memberId: id
        },
        success: function (result) {
            $("#memberInquiry").empty();

            for (var i = 0; i < result.length; i++) {

                var tr = $("<tr></tr>");
                var state;
                if(result[i].sendMemberId==result[i].receiveMemberId){
                    if (result[i].transferMoney < 0) {
                        state = $("<td></td>").text("이체 출금")
                    } else {
                        state = $("<td></td>").text("이체 입금")
                    }

                }else{
                    if (result[i].transferMoney < 0) {
                        state = $("<td></td>").text("출금")
                    } else {
                        state = $("<td></td>").text("입금")
                    }

                }

                var transferMoney = $("<td></td>").text(result[i].transferMoney);

                tr.append(state);
                tr.append(transferMoney);

                $("#memberInquiry").append(tr);
            }

        }
        ,
        error: function () {
            alert("서버호출 실패")
        }

    });
}