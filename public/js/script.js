$(document).ready(() => {
    var checkLogin = 0
    function validatePhone(phoneInput) {
        const phone = phoneInput.val();
        const regex = /^(090|086|096|097|098)\d{7,8}$/;
        const errorPhoneElement = phoneInput.siblings('#errorPhone');
        console.log(phone)
        if(phone === "") {
            errorPhoneElement.text('(Số điện thoại không được rỗng)');
        } else {
            if(!regex.test(phone)) {
                errorPhoneElement.text('(Số điện thoại bắt đầu bằng 090, 086, 096, 097, 098)');
            } else {
                errorPhoneElement.text('');
            }
        }
    }

    function validatePassword(passwordInput) {
        const password = passwordInput.val();
        const errorPasswordElement = passwordInput.siblings('#errorPassword');
        console.log(password)
        if(password === "") {
            errorPasswordElement.text('(Mật khẩu không được rỗng)');
        } else {
            if(password.length < 8) {
                errorPasswordElement.text('(Mật khẩu phải từ 8 kí tự trở lên)');
            } else  {
                if (!/[A-Z]/.test(password)) {
                    errorPasswordElement.text('(Mật khẩu phải có ít nhất một ký tự in hoa)');
                } else if (!/\W/.test(password)) {
                    errorPasswordElement.text('(Mật khẩu phải có ít nhất một ký tự đặc biệt)');
                } else if (!/\d/.test(password)) {
                    errorPasswordElement.text('(Mật khẩu phải có ít nhất một ký tự số)');
                } else {
                    errorPasswordElement.text('');
                }
            }
        }
    }

    function validateUsername(usernameInput) {
        const username = usernameInput.val();
        const errorUsername = usernameInput.siblings('#errorUsername');
        const regex = /^[A-Z][a-z]+( [A-Z][a-z]+)*$/
        console.log(username)
        if(username === "") {
            errorUsername.text('(Tên người dùng không được rỗng)');
        } else {
            if(!regex.test(username)) {
                errorUsername.text('(Tên người dùng phải viết hoa chữ cái đầu)');
            } else {
                errorUsername.text('');
            }
        }
    }

    function checkButton(phoneInput, passwordInput) {
        const phone = phoneInput.val();
        const password = passwordInput.val();
        console.log(phone)
        console.log(password)
        if(!phone || !password) {
            alert('Vui lòng nhập đầy đủ thông tin')
        } else {
            if(phone === '0971484472' && password === 'Votrieuan123!') {
                alert('Đăng nhập thành công');
                checkLogin = 1
                localStorage.setItem('checkLogin', checkLogin)
                location.reload()
            } else {
                alert('Tài khoản mật khẩu không hợp lệ');
            }
        }
    }

    function chechIconHearth(iconClick) {
        const checkLogin = localStorage.getItem('checkLogin');
        if(checkLogin != 1) {
            alert("Vui lòng đăng nhập trước khi thực hiện!")
        } else {
            const parent = $(iconClick).closest('.box-infor')
            if (parent.length > 0) {
                const spanLike = parent.find('span[data-value-like]')
                if(spanLike.length > 0) {
                    const valueLike = parseInt(spanLike[0].innerHTML) || 0;
                    const newValueLike = valueLike + 1;
                    spanLike[0].innerHTML = newValueLike
                    $(iconClick).css('color', 'red');
                }
            }
        }
    }

    $("input[data-phone]").on('input', function() {
        validatePhone($(this));
    });
    $("input[data-password]").on('input', function() {
        validatePassword($(this))
    })
    $("input[data-username]").on('input', function() {
        validateUsername($(this))
    })

    $('.icon-hearth').on('click', function() {
        chechIconHearth($(this));
    })

    $('#btn-login').on('click', () => {
        const phoneInput = $("input[data-phone]");
        const passwordInput = $("input[data-password]");
        checkButton(phoneInput, passwordInput);
        if(checkLogin === 1) {
            $('div[hidden-btn]').addClass('hidden');
            $('div[add-avt]').removeClass('hidden');
        }
    })
    $('#btn-logout').on('click', () => {
        const question = window.confirm("Bạn chắc chắn muốn đăng xuất?")
        if(question) {
            checkLogin = 0
            localStorage.setItem('checkLogin', checkLogin)
            location.reload()
            $('div[hidden-login-top]').addClass('hidden');
        }
    })
});

const checkLogin = localStorage.getItem('checkLogin');
console.log(checkLogin)
if(checkLogin == 1) {
    $('div[hidden-btn]').addClass('hidden');
    $('div[add-avt]').removeClass('hidden');
    $('div[hidden-login-top]').addClass('hidden');
} else {
    $('div[hidden-login-top]').removeClass('hidden');
}
