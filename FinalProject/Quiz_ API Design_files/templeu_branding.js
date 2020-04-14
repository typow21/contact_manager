window.BRANDING = {
    'baseUrl': 'https://academicapps.temple.edu',
    'clientId': 33
};

if (location.host === 'templeu.beta.instructure.com') {
    $.getScript(BRANDING.baseUrl + '/canvasJS/canvasmenu_beta.js');
} else {
    $.getScript(BRANDING.baseUrl + '/canvasJS/canvasmenu.js');
}


