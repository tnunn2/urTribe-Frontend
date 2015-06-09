describe('Message Service Unit Tests', function(){
    this.timeout(15000);

    var _messageService;
    beforeEach(module('urtribe.services','ionic'));

    beforeEach(inject(function (MessageService) {
      _messageService = MessageService;
    }));

    it('can get instance of Message Service', function() {
        expect(_messageService).to.exists;
    });

    /*it('can connect and authenticate user with RealTime Framework', function(done){
      _messageService.connectRealTime(function(response){
        expect(response).to.equal('{"success":"User authenticated"}');
        done();
      });
    });*/

});
