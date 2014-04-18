/**
 * Created by sungwoo on 14. 4. 18.
 */

/// <reference path="../../../def/mocha.d.ts" />
/// <reference path="../../../def/oipf.d.ts" />
/// <reference path="../../../def/oipf.humax.d.ts" />

describe('VideoBroadcast', function() {

    var videoBroadcast;
    before(function (done) {
        videoBroadcast = oipfObjectFactory.createVideoBroadcastObject();
        done();
    });

    it('should have constants', function (done) {
        done();
    });

});