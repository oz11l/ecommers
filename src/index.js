
import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import './css/style.css';
import '@fortawesome/fontawesome-free/js/all.min.js';
import { data } from 'jquery';

$(window).on('load', function () {

    $('[data-toggle="tooltip"]').tooltip();

    $('.add-to-cart-btn').on('click', function(){
      alert('اضيف المنتج الى عربة الشراء');
    });

    $('#copyright').text("جميع الحقوق محفوظة للمتجر لسنة" + new Date().getFullYear());

    $('.product-option input[type="radio"]').change(function(){
      $(this).parents('.product-option').siblings().removeClass('active');
      $(this).parents('.product-option').addClass('active')
    });


    //عندما تتغير كمية المنتج
    $('[data-product-quantity]').change(function(){
      var newQuantity = $(this).val();

      //البحث عن السطر الذي يحتوي على معلومات المنتج
      var parent = $(this).parents('[data-product-info]');

      //اجلب سعر القطعة الواحدة من معلومات المنتج
      var pricePerunit = parent.attr('data-product-price');
      
      //السعر الاجمالي للمنتج هو سعر القطعة مضروبا بعددها
      var totaPriceForProduct = newQuantity * pricePerunit;

      //عين السعر الجديد بخلية السعر الاجمالي للمنتج
      parent.find('.total-price-for-product').text(totaPriceForProduct + '$');

      //حدث السعر الاجمالي لكل المنتجات
      calculateTotalPrice();

    });

    $('[data-remove-from-cart]').click(function(){
      $(this).parents('[data-product-info]').remove();

      // اعد حساب السعر الاجمالي للمنتجات بعد حذف احد المنتجات
      calculateTotalPrice();
    });





    function calculateTotalPrice(){
      //انشاء متغير جديد لحفظ السعر الاجمالي للمنتج
      var totalPriceForAllProducts=0;
      $('[data-product-info]').each (function (){

        //جلب سعر القطعة الواحدة من الخاصية الموافقة
        var pricePerunit = $(this).attr('data-product-price');

        //اجلب كمية المنتج من حلق ادخال الكمية
        var quantity = $(this).find('[data-product-quantity]').val();

        var totalPriceForProducts = pricePerunit * quantity;

        //اضف السعر الاجمالي لهذا المنتج الى السعر الاجمالي لكل منتجات , واحفظ القيمة في المتغير نفسه
        totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProducts)
      });

      // حذث السعر لكل المنتجات في الصفحة
      $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
    }
    
    
    var citysByCountry = {
      sa: ['جدة','الرياض'],
      eg: ['القاهرة','الاسكندرية'],
      qa: ['الوكرة','الدوحة'],
      jo: ['عمان','الزرقاء'],
      sy: ['دمشق','حلب','حماة']
    };

    //عندما يتغير البلد 
    $('#form-checkout select[name="contry"]').change(function() {

      //اجلب رمز البلد
      var country = $(this).val();

      //اجلب مدن هذا البلد من المتغير
      var cities = citysByCountry[country];

      //فرغ قائمة المدن
      $('#form-checkout select[name="city"]').empty();

      //اضافة خيار اختر مدينة
      $('#form-checkout select[name="city"]').append(
       '<option disabled selected value=""> اختر المدينة</option>'
      );

      //اضف المدن الى قائمة المدن
      cities.forEach(function(city){
        var newOption = $('<option></option>');
        newOption.text(city);
        newOption.val(city);
        $('#form-checkout select[name="city"]').append(newOption);
      });
          
    });


    //عندما تتغير طريقة الدفع
    $('#form-checkout input[name="payment_method"]').change(function() {

      //اجلب القيمة المختارة حاليا
      var paymentMethod = $(this).val();

      if(paymentMethod === 'on_delivary'){
        
        //اذا كانت عند الاستلام فعطل حقول الاستلام بالبطاقة
        $('#credit-card-info input').prop('disabled',true);

      } else{

        //وإلا ففعلها
        $('#credit-card-info input').prop('disabled',false);

      }

      //بدل معلومات البطاقة بين الظهور و الاختفاء
      $('#credit-card-info').toggle();
    });

  });
