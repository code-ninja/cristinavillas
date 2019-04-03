(function(s, w, a, y) {
  var t = '_SwayChat';
  w[t] = w[t] || function() {
    (w[t].q = w[t].q || []).push(arguments)
  };
  var c = a.createElement(s),
    h = a.getElementsByTagName(s)[0];
  c.async = 1;
  c.src = y;
  h.parentNode.insertBefore(c, h);
}('script', window, document, '//cdn.swaychat.com/v2/widget/assets/widget.js'));


export default ({ app, store }) => {

  let widgetId = store.getters.getSettingByName('swaychat')
  if (widgetId)
    _SwayChat('create', 'c820e800-0c08-5b7f-889c-2c260df897ed', widgetId);

}
