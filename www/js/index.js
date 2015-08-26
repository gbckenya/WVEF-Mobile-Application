//start cordova
document.addEventListener("deviceready",onDeviceReady,false);
//
function onDeviceReady() {
    //run cordova services
    //PhoneGap.addConstructor( function() {
        //PhoneGap.addPlugin('ShareSocial', new ShareSocial());
    //});
}
//app functions start HERE
//
//get companies
//Check if cookies are set
//console.log(Cookies.get('name'));

function get_companies(offset,q){
    if(q != null){
        var apiHost = 'https://api.smartcanvas.com/card/v1/cards/?q=' +q+ '&status=any&offset=' +offset;
    }else{
        var apiHost = 'https://api.smartcanvas.com/card/v1/cards/?status=any&offset=' +offset;
    }
    //console.log('Offset = ' +offset);    
    var clientId = 'kMRaR35PmKwZRqtEfznNkQUaiitKr0Ij';
    var CLIENT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5WVNyOWlncm1Qa1IiLCJpYXQiOjE0MzgyNjY3OTEsImV4cCI6MTQ2OTgwMzA2Miwic3ViIjoicm9vdEBleGFtcGxlLmNvbSIsInJvb3QiOnRydWUsInRva2VuVHlwZSI6IkFDQ0VTUyIsImVtYWlsIjoicm9vdEBleGFtcGxlLmNvbSJ9.308YvI73sQM3IkCu_iIOQ1h55pAW9nZttG2xOVspdwE';
    //get the page from current page
    $.ajax({
        url : apiHost,
        type : 'GET',
        dataType : 'json',
        headers : {
            'Accepts': 'application/json, text/plain, */*',
            //'Accept-Encoding' : 'gzip, deflate',
            'x-client-id' : clientId,
            'x-access-token' : CLIENT_TOKEN
        },
        beforeSend : function(xhr){
            //console.log('Start');
            $('.ajax_request').removeClass('hide');
        },
        error : function(xhr, status, error){
            console.log(xhr.responseText+ ' | ' +status+ '|' +error);
        },
        complete : function(xhr, status){
            //console.log('End');
            $('.ajax_request').addClass('hide');
            //$(this).text('Done. Run again');
        },
        success : function(result, status, xhr){
            //console.log(result.meta);
            console.log(result.data);
            var woblist = '';
            for(var i= 0; i < result.data.length; i++){
                //console.log(result.data[i].attachments[0].images[0].url);
                woblist += '<div class="list-group-item woblist-new" data-toggle="modal" data-target=".bs-example-modal-lg-one'+ [i] +'">';
                woblist += '<div class="container">';
                woblist += '<div class="col-xs-2 col-sm-2"><img src="' +result.data[i].attachments[0].images[0].url+ '" class="img-responsive heightauto"/></div>';
                woblist += '<div class="col-xs-10 col-sm-10">';
                woblist += '<p><strong>' +result.data[i].title+ '</strong></p>';
                //Address
                if(result.data[i].jsonExtendedData.address){
                    woblist += '<p>'+ result.data[i].jsonExtendedData.address +'</p>';
                }
                //Phone
                if(result.data[i].jsonExtendedData.phone){
                    woblist += '<p><a href="tel:'+ result.data[i].jsonExtendedData.phone +'">'+ result.data[i].jsonExtendedData.phone +'</a></p>';
                }
                //Country
                woblist += '<p><span class="glyphicon glyphicon-globe"></span>' +result.data[i].jsonExtendedData.country+ '</p>';     
                //Website           
                woblist += '<p><span class="glyphicon glyphicon-share-alt"></span><a href="' +result.data[i].jsonExtendedData.website+ '" target="_blank">' +result.data[i].jsonExtendedData.website+ '</a></p>';    
                woblist += '</div>';
                woblist += '</div>';
                woblist += '</div>';
                woblist += '<div class="modal fade bs-example-modal-lg-one'+ [i] +'" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">';
                woblist += '<div class="modal-dialog modal-lg">';
                woblist += '<div class="modal-content">';
                woblist += '<div class="modal-header">';
                woblist += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                woblist += '<h4 class="modal-title" id="gridSystemModalLabel"><strong>' +result.data[i].title+ '</strong></h4>';
                woblist += '</div>';
                woblist += '<div class="modal-body">';
                //Modal Content
                woblist += '<div class="container-fluid">';
                    //Phone
                    if(result.data[i].phone){
                        woblist += '<p><a href="tel:' +result.data[i].phone+ '">' +result.data[i].phone+ '</a></p>';
                    }
                    //Address
                    if(result.data[i].jsonExtendedData.address){
                        woblist += '<p>'+ result.data[i].jsonExtendedData.address +'</p>';
                    }
                    //Country
                    woblist += '<p>' +result.data[i].jsonExtendedData.country+ '</p>';     
                    //Website           
                    woblist += '<p><a href="' +result.data[i].jsonExtendedData.website+ '" target="_blank">' +result.data[i].jsonExtendedData.website+ '</a></p>';
                    //Email Address
                    woblist += '<div class="list-group">';
                    //Contact Name and Title
                    woblist += '<div class="list-group-item"><span class="glyphicon glyphicon-user"></span>' +result.data[i].jsonExtendedData.contactName+ ', ' +result.data[i].jsonExtendedData.contactJobTitle+ '</div>';
                    //Year of Establishment
                    woblist += '<div class="list-group-item"><span class="glyphicon glyphicon-calendar"></span>Established in ' +result.data[i].jsonExtendedData.yearOfEstablishment+ '</div>';
                    //% Women owned
                    woblist += '<div class="list-group-item"><span class="glyphicon glyphicon-scale"></span>' +result.data[i].jsonExtendedData.percBusinessOwnedByWomen+ '% business owned by Women</div>';
                    //Managed by women
                    woblist += '<div class="list-group-item"><span class="glyphicon glyphicon-globe"></span>Managed by Women? ' +result.data[i].jsonExtendedData.isManagedControledByWomen+ '</div>';
                    //Permanent Employees
                    woblist += '<div class="list-group-item"><span class="glyphicon glyphicon-king"></span>' +result.data[i].jsonExtendedData.numPermEmployee+ ' Permanent employees</div>';
                    //Female Employees
                    woblist += '<div class="list-group-item"><span class="glyphicon glyphicon-queen"></span>' +result.data[i].jsonExtendedData.numFemaleEmployee+ ' Female employees</div>';
                    //Certifications
                    if(result.data[i].jsonExtendedData.certifications){
                        woblist += '<div class="list-group-item">' +result.data[i].jsonExtendedData.certifications+ '</div>';
                        }
                    //Member of
                    if(result.data[i].jsonExtendedData.memberOf){
                        woblist += '<div class="list-group-item"><small>Member of</small></br>' +result.data[i].jsonExtendedData.memberOf+ '</div>';
                        }
                    woblist += '</div>';
                    //woblist += '<p><a href="mailto:info@company' +[i]+ '.co.ke">info@company'+ [i] +'.co.ke</a></p>';
                    //woblist += '<p>' +result.data[i].jsonExtendedData.businessDescription+ '</p>';
                    //woblist += '<p>Services / Products</p>';
                    woblist += '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
                    //repeat from here
                        woblist += '<div class="panel panel-default">';
                            woblist += '<div class="panel-heading" role="tab" id="headingOne' +[i]+ '">';
                                woblist += '<h4 class="panel-title">';
                                woblist += '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne' +[i]+ '" aria-expanded="true" aria-controls="collapseOne' +[i]+ '">Business Description</a>';
                                woblist += '</h4>';
                            woblist += '</div>';
                            woblist += '<div id="collapseOne' +[i]+ '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne' +[i]+ '">';
                                woblist += '<div class="panel-body">';
                                woblist += '<p>' +result.data[i].jsonExtendedData.businessDescription+ '</p>';
                                woblist += '</div>';
                            woblist += '</div>';
                        woblist += '</div>';
                    woblist += '</div>';
                    //end of accordion services 
                    //Start sharing area
                    woblist += '<nav class="modal-pagination">';
                        woblist += '<ul class="pagination modal-pagination">';
                            //Phone call
                            woblist += '<li>';
                                woblist += '<a href="tel:+254 786220003"><span class="glyphicon glyphicon-earphone"></span>Call</a>';
                            woblist += '</li>';
                            //Email
                            woblist += '<li>';
                                woblist += '<a href="mailto:info@gbc.co.ke?Subject=Business-Information&Body=I-would-like-to-do-business-with-you"><span class="glyphicon glyphicon-envelope"></span>Email</a>';
                            woblist += '</li>';
                            woblist += '<li>';
                                woblist += '<a href="#" class="share-button" data-title="' +result.data[i].title+ '" data-url="' +result.data[i].jsonExtendedData.website+ '"><span class="glyphicon glyphicon-share-alt"></span>Share</a>';
                            woblist += '</li>';
                            //Share
                        woblist += '</ul>';
                    woblist += '</nav>';
                    //End sharing
                woblist += '</div>';       
                woblist += '</div>';
                woblist += '</div>';
                woblist += '</div>';
                woblist += '</div>';
            }
            //$('.companies').append(htmlval);
            $('.wob-list .list-group').html(woblist);
        }
    });
}

//
//app functions end here
$(function(){
    //start alo carousel
    $('.carousel').carousel({
        interval: 4000
    });
    // Off canvas left animation right
    $('.glyphicon-menu-hamburger').click(function(){
        $('.off-canvas-left').animate({
            left:'+=80%'
        },300,'swing')
    });
    $('.off-canvas-left .glyphicon-remove').click(function(){
        $('.off-canvas-left').animate({
            left:'-=80%'
        },200,'swing')
    });
    // Off canvas left animation right
    $('.glyphicon-lock').click(function(){
        $('.off-canvas-right').animate({
            left:'-=80%'
        },300,'swing')
    });
    $('.off-canvas-right .glyphicon-remove').click(function(){
        $('.off-canvas-right').animate({
            left:'+=80%'
        },200,'swing')
    });
    //check if the element .wob-list .list-group exists
    if($('.wob-list .list-group').length > 0){
        //get the current page
        var q = null;
        var current_page = parseInt($('.current_page').text());
        var prev_page, next_page;
        if(current_page == 0){
            offset = 0;
            prev_page = 0;
            next_page = 1;
        }else{
            offset = current_page * 10;
            prev_page = current_page - 1;
            next_page = current_page + 1;
        }
        //console.log(current_page+ ' | ' +offset);
        get_companies(offset, q);
    }
    //Search function
    $('input#exampleInputSearch').keypress(function(e){
        var code = e.keyCode || e.which;
        if(code == 13){
            //console.log();
            //get the current page
            var q = $('input#exampleInputSearch').val();
            var current_page = parseInt($('.current_page').text());
            var prev_page, next_page;
            if(current_page == 0){
                offset = 0;
                prev_page = 0;
                next_page = 1;
            }else{
                offset = current_page * 10;
                prev_page = current_page - 1;
                next_page = current_page + 1;
            }
            //console.log(current_page+ ' | ' +offset);
            get_companies(offset, q);
        }
    });
    //End
    $('.previous').click(function(){
        //get the previous page
        var prev_page = parseInt($(this).attr('data-prev'));
        var current_page, next_page;
        var q = null;
        if(prev_page <= 0){
            //set current page and next page
            current_page = 0;
            next_page = current_page + 1;
            prev_page_next = 0;
            offset = current_page * 10;
        }else{
            //
            current_page = prev_page;
            next_page = current_page + 1;
            prev_page_next = current_page - 1;
            offset = current_page * 10;
        }
        //set this
        $('.previous').attr('data-prev',prev_page_next);
        $('.current').text(current_page);
        $('.next').attr('data-next',next_page);
        get_companies(offset, q);

    });
    $('.next').click(function(){
        //get the previous page
        var next_page = parseInt($(this).attr('data-next'));
        var q = null;
        var current_page, prev_page;
            current_page = next_page;
            prev_page = current_page - 1;
            next_page_next = next_page + 1;
            offset = current_page * 10;
            //set this
            $('.previous').attr('data-prev',prev_page);
            $('.current').text(current_page);
            $('.next').attr('data-next',next_page_next);
            get_companies(offset, q);

    });
    //ebd WOBlist
    // Start the html for Buyers list
    var buyerslist = '';
    for (var i = 1; i <= 8; i++) {
        buyerslist += '<div class="list-group-item" data-toggle="modal" data-target=".bs-example-modal-lg-one'+ [i] +'">';
        buyerslist += '<p><strong>Buyer A' + [i] + '</strong></p>';
        buyerslist += '<p>Sunny Vale California</p>';
        buyerslist += '<p><a href="tel:+254 720 000 00'+ [i] +'">+254 720 000 00'+ [i] +'</a></p>';
        buyerslist += '<p><a href="mailto:info@buyer' +[i]+ '.co.ke">info@buyer'+ [i] +'.co.ke</a></p>';      
        buyerslist += '</div>';
        buyerslist += '<div class="modal fade bs-example-modal-lg-one'+ [i] +'" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">';
        buyerslist += '<div class="modal-dialog modal-lg">';
        buyerslist += '<div class="modal-content">';
        buyerslist += '<div class="modal-header">';
        buyerslist += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        buyerslist += '<h4 class="modal-title" id="gridSystemModalLabel">Buyer '+ [i] +'</h4>';
        buyerslist += '</div>';
        buyerslist += '<div class="modal-body">';
        buyerslist += '<div class="container-fluid">';
        buyerslist += '<p>Sunny Vale California</p>';
        buyerslist += '<p><a href="tel:+254 720 000 00'+ [i] +'">+254 720 000 00'+ [i] +'</a></p>';
        buyerslist += '<p><a href="mailto:info@company' +[i]+ '.co.ke">info@buyer'+ [i] +'.co.ke</a></p>';
        buyerslist += '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet rhoncus tempor.Suspendisse dapibus vulputate dolor ut tincidunt. Suspendisse tristique laoreet dui, ut tempor orci dictum ut. Quisque aliquam urna ac justo tristique interdum. Aliquam in dui eget lectus elementum lacinia eget eu sem.</p>';
        buyerslist += '<p>Tenders / Bids / RFPs </p>';
        buyerslist += '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
        //repeat from here
        for(var k = 1; k <= 2; k++){
            buyerslist += '<div class="panel panel-default">';
            buyerslist += '<div class="panel-heading" role="tab" id="headingOne' +[i]+[k]+ '">';
            buyerslist += '<h4 class="panel-title">';
            buyerslist += '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne' +[i]+[k]+ '" aria-expanded="true" aria-controls="collapseOne' +[i]+[k]+ '">Tender #' +[i]+[k]+ '</a>';
            buyerslist += '</h4>';
            buyerslist += '</div>';
            buyerslist += '<div id="collapseOne' +[i]+[k]+ '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne' +[i]+[k]+ '">';
            buyerslist += '<div class="panel-body">';
            buyerslist += 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus';
            buyerslist += '<nav><ul class="pagination">';
            buyerslist += '<li><a href="mailto:imailto:info@company' +[i]+ '.co.ke"><span class="glyphicon glyphicon-envelope"></span> Email</a></li>';
            buyerslist += '<li><a href="#" class="share-button" data-title="Buyer '+ [i] +'" data-url="http://buyer'+ [i] +'.co.ke"><span class="glyphicon glyphicon-share"></span>Share</a></li>';
            buyerslist += '<li><a href="tel:+254 720 000 00'+ [i] +'"><span class="glyphicon glyphicon-phone"></span>Call</a></li>';
            buyerslist += '</ul></nav>';
            buyerslist += '</div>';
            buyerslist += '</div>';
            buyerslist += '</div>';
            buyerslist += '</div>';
        }
        //end repeat
        buyerslist += '</div>';
        //end of accordion services
        buyerslist += '</div>';
        buyerslist += '</div>';
        buyerslist += '</div>';
        buyerslist += '</div>';
    };
    $('.buyers-list .list-group').html(buyerslist);
    //ebd Buyers
    //hide fields on toggle buyer or wob
    $('select.group').change(function(){
        var group = $(this).val();
        if(group == 'wob'){
            $('.buyer-display').hide();
            $('.wob-display').show();
        }else if(group == 'buyer'){
            $('.wob-display').hide();
            $('.buyer-display').show();
        }
    });
    //on clicking share buttons
    $('.list-group').on('click','.share-button',function(){
        //console.log('Clicked');
        var title = $(this).attr('data-title');
        var dataurl = $(this).attr('data-url');
        //console.log(url);
        window.plugins.socialsharing.share(title, null, null, dataurl);
    });
    //login function
    $('input#exampleInputSubmit').click(function(){
        $.ajax({
            url : 'http://wvef.gbc.co.ke/joomla_343/api.php',
            type : 'post',
            data : {
                username : $('input#exampleInputEmail').val(),
                password : $('input#exampleInputPassword').val()
            },
            beforeSend : function(xhr){
                console.log(xhr);
                $('input#exampleInputSubmit').attr('value','Logging in .....');
            },
            error : function(xhr, status, error){
                console.log(xhr);
                //console.log('Error');
                $('input#exampleInputSubmit').attr('value','Error, try again');
                $('input#exampleInputSubmit').delay(2000).attr('value','Login');
            },
            complete : function(xhr, status){
                console.log(xhr);
                //console.log('Completed');
            },
            success : function(datareturn, status, xhr){
                var datahere = JSON.parse(datareturn);
                console.log(datahere.name);
                //$('input#exampleInputSubmit').attr('value','Login Successful :)');
                if(datahere.error == '0'){
                    //Set Cookie
                    Cookies.set('name', datahere.name);
                    Cookies.set('id', datahere.id);
                    Cookies.set('email', datahere.email);
                    $('input#exampleInputSubmit').attr('value','Awesome, you\'re in');
                    $('.form-group.logoff').fadeIn('fast');
                    $('.form-group.login').hide('fast');
                    $('.logoff p').html('Dear ' +Cookies.get('name')+ ', Welcome to the Women Owned Businesses Network');
                }else if(datahere.error == '1'){
                    $('input#exampleInputSubmit').attr('value','Error, please try again');
                    //$('input#exampleInputSubmit').delay(2000).attr('value','Login');
                }
            }
        });
    });
    $('input#exampleInputSearch').focusin(function(){
        $('.advanced-search-button.form-group').slideToggle('fast');
    });
    $('input#exampleInputSearch').focusout(function(){
        $('.advanced-search-button.form-group').slideToggle('fast');
    });
});