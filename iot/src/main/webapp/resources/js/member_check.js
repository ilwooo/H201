/**
 * 회원가입시 입력항목의 유효성 판단,
 	비밀번호 변경 시  비밀번호 재확인
 */
 
 var member  =
 {
	tag_status: function( tag ){
		var name = tag.attr('name');
		if( name=='pw_ck') return this.pw_ck_status( tag.val() );
		else if( name=='pw' ) return this.pw_ck_status( tag.val() );
	},
	
	space: /\s/g,
	pw_status: function(pw){
		//영문대/소문자, 숫자 모두 포함
		var reg = /[^A-Z0-9a-z]/g;
		var upper=/[A-Z]/g, lower=/[a-z]/g, no=/[0-9]/g;
		if(pw=='') return this.pw.common.empty;
		else if( pw.match(this.space) ) return this.common.space;
		else if( reg.test(pw) )		return this.pw.invalid;
		else if( pw.length < 5 ) 	return this.common.min;
		else if( pw.length > 10 )	return this.common.max;
		else if( !upper.test(pw) || !lower.test(pw) 
					|| !no.test(pw) )  return this.pw.lack;
		else 						return this.pw.valid;
	},
	
	common: {
		empty: { code:'invlid', desc:'입력하세요'},
		space: { code:'invalid', desc:'공백없이입력하세요'},
		min: { code:'invalid', desc:'5자이상 입력하세요'},
		max: { code:'invalid', desc:'10자이내 입력하세요'},
	},
	
	pw_ck_status: function(pw_ck){
		if( pw_ck==$('[name=pw]').val() ) return this.pw.equal;
		else									return this.pw.notEqual
	},
	
	pw: {
		valid: { code:'valid', desc:'사용가능 비밀번호'},
		lack: { code:'invalid', desc:'영문/대소문자,숫자를 모두 포함해야 합니다' },
		invalid: {code:'invalid', desc:'영문/대소문자, 숫자만 입력하세요'},
		equal: { code:'valid', desc:'비밀번호가 일치합니다.' },
		notEqual: { code:'invalid', desc:'비밀번호가 일치하지 않습니다. 다시 입력하세요' }
	}
}