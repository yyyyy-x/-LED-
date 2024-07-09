class Action {
constructor(parameter) {
this._data = parameter;
this._desc_group = $('.detail-item-group');
this._action = false;
this._deg = 45;
this._base_deg = 80;


this._add_html();
this._add_event();


}
_add_html() {
let html = '';
for (let i = 0; i < this._data.length; i++) {
let this_data = this._data[i];
html += '<li class="nav-item ' + (i == 0 ? 'action' : '') + '" data-base-deg = "' + (this._base_deg + (i * this._deg)) + '"><span class="background-holder" style="background: url(' + this_data.pic + ');"></span></li>';
}
$('.nav-group').html(html);

$('.detail-item-group').find('.title').html(this._data[0].title).end()
.find('.background').css({ 'background': 'url(' + this._data[0].backgrund + ')', 'background-size': 'cover', 'background-position': 'center' });
}
_add_event() {
let that = this;
this._nav_item = $('.nav-item');
// 3、自动播放图片->定时器 —> 自动执行已经写好按钮点击事件
this._nav_item.click(function () {
    if (!that._actio) {
    that._act_fun($(this));
    }
    });

}
_sleep(time) {
return new Promise((resolve) => setTimeout(resolve, time * 1000));
}
// (async function() {
//     await sleep(1);
// })();
_act_fun(obj) {
let that = this;
let index = obj.index();
let action_index = $('.nav-item.action').index();
let this_data = this._data[index];


(async function () {
that._actio = true;
that._nav_item.removeClass('action');
let num = index - action_index; //点击和现在显示的差值
that._desc_group.css('opacity', 0.3);
await that._sleep(0.1);
for (let i = 0; i < 8; i++) {
let new_deg = 0;
if ((num <= 4 && num > 0) || (num < 0 && num < -4)) { //倒转
new_deg = parseInt(that._nav_item.eq(i).attr('data-base-deg')) - that._deg;
} else { //正传
new_deg = parseInt(that._nav_item.eq(i).attr('data-base-deg')) + that._deg;
}
that._nav_item.eq(i).attr('data-base-deg', new_deg);
that._nav_item.eq(i).css('transform', 'rotate(' + new_deg + 'deg)');
}
await that._sleep(0.5);
that._desc_group.find('title').html(this_data.name).end()
.find('.background').css({ 'background': 'url(' + this_data.backgrund + ')', 'background-size': 'cover', 'background-position': 'center' });
that._desc_group.css('opacity', 1);
await that._sleep(0.5);
obj.addClass('action');
that._actio = false;
})();
}
}
