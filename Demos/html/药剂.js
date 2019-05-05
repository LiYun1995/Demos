

    var configAddress="http://"+$("body").attr("address");
    // 绘制表格原始数据
    initializeTable();
    function initializeTable() {
        var patientHeadData = [
        	{
        		"field" : "preNumber",
        		"title" : "处方编号"
        	},
        	{
        		"field" : "cliNumber",
        		"title" : "就诊号"
        	},
        	{
        		"field" : "preType",
        		"title" : "处方类型"
        	},
        	{
        		"field" : "illNumber",
        		"title" : "病历编号",
        		"formatter" : function(value,row,index){
                    if (row.illNumber.illnessRecord){
                        return row.illNumber.illnessRecord.number;
                    } else {
                        return "";
                    }
                }
        	},
        	{
        		"field" : "patientName",
        		"title" : "患者姓名"
        	},
        	{
        		"field" : "patientNumber",
        		"title" : "患者编号"
        	},
        	{
        		"field" : "patientAge",
        		"title" : "患者年龄"
        	},
        	{
        		"field" : "sex",
        		"title" : "患者性别",
        		"formatter" : function(value,row,index){
                    return globalData.formatterSex(row.sexCode);
                }
        	},
        	{
        		"field" : "patientCardType",
        		"title" : "证件类型"
        	},
        	{
        		"field" : "documentNumber",
        		"title" : "证件号"
        	},
        	{
        		"field" : "YCpreStatus",
        		"title" : "状态",
        		"formatter" : function(value,row,index){
                    if (row){
                        if(row.preStatus == 1){
                            return "已审核";
                        }else if(row.preStatus == 0){
                            return "已新建";
                        }else if(row.preStatus ==2){
                            return "未通过";
                        }else if(row.preStatus ==-1){
                            return "已作废";
                        }
                    } else {
                        return value;
                    }
                },
                "styler" : function(value,row,index){
                    if (row.preStatus == 2) {
                        return {style:'color:red'}
                    }else if (row.preStatus == -1) {
                        return {style:'color:blue'}
                    }
                }
        	},
        	{
        		"field" : "YCcostState",
        		"title" : "费用状态",
        		"formatter" : function(value,row,index){
                    if (row){
                        if(row.costStutas == 1){
                            return "已缴费";
                        }else if(row.costStutas == 2){
                            return "未缴费";
                        }else if(row.costStutas ==3){
                            return "已作废";
                        }else if(row.costStutas ==4){
                            return "可退费";
                        }
                    } else {
                        return value;
                    }
                }
        	},
        	{
        		"field" : "YCreceipt",
        		"title" : "发药情况",
        		"formatter" : function(value,row,index){
                    if (row){
                        if(row.receipt == 0){
                            return "未发药";
                        }else if(row.receipt ==1){
                            return "已发药";
                        }
                    } else {
                        return value;
                    }
                }
        	}
        ];
        $("#view4b77b5929d2d42a8b59f47495c21ade8").datagrid({
            url: configAddress + "/prescription/findPrescriptions", //page=1&rows=10初始化不变
            method: 'post',
            height: $("#middle .middleTable").height(),
            autoRowHeight:false,
            queryParams: {
                "page": 1,
                "rows": 15,
            },
            rownumbers: true,
            fitColumns: true,
            singleSelect: true,
            checkOnSelect: false,
            pagination: true,
            columns: [patientHeadData],
            loadFilter: function (gridData) {
                if (gridData.rows.length  == 0) {
                    middleOperation({
                        "name": "系统",
                        "id": "System",
                        "important": "classThree",
                        "text": "[系统] 列表信息数据为空。"
                    });
                    return {rows:[],total:0}
                }else{
                    return gridData
                }
            },
            onSelect : function(rowIndex, rowData) {
                initializeMessage(rowData.id,rowData.medType);
            }
        });
    };        

    //加载处方详细信息
    function initializeMessage(id,medType) {
        $.ajax({
            type: "post", //post提交方式默认是get
            url: configAddress + "/prescription/findPrescriptionById",
            data: {
                "id":id,
                "medType":medType
            },
            dataType: "json",
            success: function (data) {
                // console.log(data)
                if(data.error == true){
                    middleOperation({
                        "name": "系统",
                        "id": "System",
                        "important": "classThree",
                        "text": "处方查询失败"
                    });
                }else{
                    var myCase = ""; /*诊断*/
                    var isDoubt = ""; /*疑似*/
                    if(data.disDetail){
                        var symbol = "";  /*符号*/
                        for(var i=0;i<data.disDetail.length;i++){
                            if(i == data.disDetail.length - 1){
                                symbol = "。";
                            } else {
                                symbol = "; ";
                            }
                            if (data.disDetail[i].status == 0) {
                                isDoubt = "?";
                            } else {
                                isDoubt = "";
                            }
                            if (data.disDetail[i].icd10Id) {
                                if (data.disDetail[i].dname) {
                                    myCase += (i + 1) +". " + isDoubt + data.disDetail[i].icd10Name + " , " + data.disDetail[i].dname + symbol;
                                } else {
                                    myCase += (i + 1) +". " + isDoubt + data.disDetail[i].icd10Name + symbol;
                                }
                            } else if (data.disDetail[i].dname) {
                                myCase += (i + 1) +". " + isDoubt + data.disDetail[i].dname + symbol;
                            }
                        }
                    }else{
                        myCase = "无。"
                    }
                    
                    var preDetails = ""; //处方明细
                    var preDetailMoney = 0;  //处方金额
                    for(var j=0;j<data.preDetail.length;j++){
                        var mystatus = "",myZT = "";
                        preDetailMoney = (data.preDetail[j].costRevenue*1000 + preDetailMoney*1000) / 1000;
                        if(data.preDetail[j].mark){
                            data.preDetail[j].mark = data.preDetail[j].mark.replace(/s+/g,"");
                            if(data.preDetail[j].mark == ""){
                                myZT = "<span>嘱托：无。</span>。"
                            }else if(data.preDetail[j].mark && data.preDetail[j].mark != ""){
                                myZT = "<span>嘱托："+ data.preDetail[j].mark +"</span>。"
                            }
                        }
                        preDetails += "<div>"+
                            "<div class='name'>"+ (j + 1) + " . " +data.preDetail[j].drugName +" [ "+ data.preDetail[j].standard +" ]</div>"+
                            "<div class='number'>数量："+ data.preDetail[j].number+data.preDetail[j].numberCompany +"</div>"+
                            "<div class='specifications'>规格：" +data.preDetail[j].specifications+ "</div>"+
                            "<div class='other'>"+
                            "<span>用法："+ data.preDetail[j].use +"</span>；"+
                            "<span>频次："+ data.preDetail[j].frequency +"</span>；"+
                            "<span>用量："+ data.preDetail[j].singleDosagel +"</span>；"+
                            myZT+
                            "</div>"+
                            "</div>";
        
                    }
                    //是否有更多信息
                    var moreMessagesOne = "<div>";  //第一个
                    if(data.medicine_user){
                        moreMessagesOne += "<div>药师（审核，校对，发药）："+ data.medicine_user.medicine_user +"</div>";
                    }
                    if(data.allocate_user){
                        moreMessagesOne += "<div>药师/士（调配）："+ data.allocate_user.allocate_user +"</div>";
                    }
                    moreMessagesOne += "</div>";
                    
                    var moreMessagesTwo = "<div>";  //第2个
                    if(data.settlementUserName){
                        moreMessagesTwo += "<div>收费："+ data.settlementUserName +"</div><div>收费时间："+ data.settlementTime +"</div>";
                    }
                    moreMessagesTwo += "</div>";
                    
                    var moreMessagesThree = "<div>";  //第3个
                    if(data.backPillsUserName){
                        moreMessagesThree += "<div>退药："+ data.backPillsUserName +"</div><div>退药时间："+ data.backPillsTime +"</div>";
                    }
                    moreMessagesThree += "</div>";
                    
                    let myHtml = "<div id='prescriptionLookHead'>" +
                            "<h1>处方信息</h1>"+
                            "<div id='prescriptionLookType'>" + data.preTypeName + "</div>" +
                        "</div>" +
                        "<div id='prescriptionLookMessage'>" +
                            "<div id='prescriptionLookMessageOne'>" +
                                "<div>" +
                                    "处方编号：<span>" + data.prenumber + "</span>" +
                                "</div>" +
                                "<div>" +
                                    "就诊编号：<span>" + data.clinumber + "</span>" +
                                "</div>" +
                                "<div>" +
                                    "开具时间：<span>" + data.businessTime + "</span>" +
                                "</div>" +
                            "</div>" +
                            "<div id='prescriptionLookMessageTwo'>" +
                                "<div>" +
                                    "姓名：<span>" + data.patientName + "</span>" +
                                "</div>" +
                                "<div>" +
                                    data.patientCardType +"：<span>" + data.documentNumber + "</span>" +
                                "</div>" +
                                "<div>" +
                                    "年龄：<span>" + data.age + "</span>" +
                                "</div>" +
                            "</div>" +
                            "<div id='prescriptionLookMessageThree'>" +
                                "临床诊断：<span>" + myCase + "</span>" +
                            "</div>" +
                        "</div>" +
                        "<h1>R.</h1>" +
                        "<div id='prescriptionLookDrugList'>" + preDetails + "</div>" +
                        "<div id='prescriptionDivider'></div>" +
                        "<div id='prescriptionLookFooter'>" +
                            "<div>" +
                                "<div>医师：<span class='doctorName'>" + data.doctor + "</span></div>" +
                                "<div>金额：￥<span class='allPrice'>" + thousandBitSeparator(preDetailMoney) + "</span>元</div>" +
                            "</div>" + moreMessagesOne + moreMessagesTwo + moreMessagesThree + 
                        "</div>";
                    $("#prescriptionLook").html(myHtml);
                    
                    //处方类型样式设置
                    if(data.preTypeId == '5f6df5ba7fdf4d93b11b0d8f604c7c0f'){//急诊
                        $("#prescriptionLookType").css("backgroundColor","#f5d96b")
                    }else if(data.preTypeId == '1b3dffaa0f5e454bbd4b8919a868980d'){//精二
                        $("#prescriptionLookType").css("backgroundColor","#fff")
                    }else if(data.preTypeId == '6b5c4b2b16c9455c9eae47168b5aec7e'){//精一
                        $("#prescriptionLookType").css("backgroundColor","#ff5858")
                    }else if(data.preTypeId == '93a901fba1c8419fa13a4752f0f88c0f'){//儿科
                        $("#prescriptionLookType").css("backgroundColor","#85efff")
                    }else if(data.preTypeId == 'af15dd4469864b4ea8f20876da309dce'){//普通
                        $("#prescriptionLookType").css("backgroundColor","#fff")
                    }
                    //处方斜线样式设置
                    if(data.preDetail.length == 1){
                        $("#prescriptionDivider").css({
                            "transform": "rotate(-23deg)",
                            "top": "427px"
                        })
                    }else if(data.preDetail.length == 2){
                        $("#prescriptionDivider").css({
                            "transform": "rotate(-18deg)",
                            "top": "450px"
                        })
                    }else if(data.preDetail.length == 3){
                        $("#prescriptionDivider").css({
                            "transform": "rotate(-15deg)",
                            "top": "485px"
                        })
                    }else if(data.preDetail.length == 4){
                        $("#prescriptionDivider").css({
                            "transform": "rotate(-12deg)",
                            "top": "515px"
                        })
                    }else if(data.preDetail.length > 4){
                        $("#prescriptionDivider").css({
                            "transform": "rotate(-9deg)",
                            "top": "545px"
                        })
                    }
                }
            },
            error: function (err) {
                middleOperation({
                    "name": "系统",
                    "id": "System",
                    "important": "classThree",
                    "text": "处方查询失败"
                });

            }
        });
    }