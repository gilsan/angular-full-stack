"use strict";
exports.__esModule = true;
exports["default"] = {
    getTotal: function (invoice) {
        var total = 0;
        var subTotal = 0;
        if (typeof invoice.qty !== 'undefined' && invoice.rate !== 'undefined') {
            total = invoice.qty * invoice.rate;
        }
        var salesTax = 0;
        if (typeof invoice.tax !== 'undefined') {
            salesTax = total * invoice.tax / 100;
        }
        subTotal = total * salesTax;
        return { total: total, subTotal: subTotal };
    },
    getTemplateBody: function (invoice, subTotal, total, user) {
        var templateBody = "\n    <div class=\"container\">\n  <div class=\"row\">\n      <div class=\"col-xs-6\">\n      </div>\n      <div class=\"col-xs-6 text-right\">\n          <h1>INVOICE</h1>\n          <h1>\n              <small>" + invoice.item + "</small>\n          </h1>\n      </div>\n  </div>\n  <div class=\"row\">\n      <div class=\"col-xs-5\">\n          <div class=\"panel panel-default\">\n              <div class=\"panel-heading\">\n                  <h4>From:\n                      <a>" + user.name + "</a>\n                  </h4>\n              </div>\n              <div class=\"panel-body\">\n                  <p>\n                      " + user.email + "\n                      <br>\n                  </p>\n              </div>\n          </div>\n      </div>\n      <div class=\"col-xs-5 col-xs-offset-2 text-right\">\n          <div class=\"panel panel-default\">\n              <div class=\"panel-heading\">\n                  <h4>To :\n                      <a>" + invoice.client.lastName + " " + invoice.client.firstName + "</a>\n                  </h4>\n              </div>\n              <div class=\"panel-body\">\n                  <p>\n                      " + invoice.client.email + "\n                      <br>\n                  </p>\n              </div>\n          </div>\n      </div>\n  </div>\n  <table class=\"table table-bordered\">\n      <thead>\n          <tr>\n              <th>\n                  <h4>Qty</h4>\n              </th>\n              <th>\n                  <h4>Rate</h4>\n              </th>\n              <th>\n                  <h4>Tax</h4>\n              </th>\n          </tr>\n      </thead>\n      <tbody>\n          <tr>\n              <td>" + invoice.qty + "</td>\n              <td>" + invoice.rate + "</td>\n              <td>\n                  " + invoice.tax + "\n              </td>\n          </tr>\n      </tbody>\n  </table>\n  <div class=\"row text-right\">\n      <div class=\"col-xs-2 col-xs-offset-8\">\n          <p>\n              <strong>\n                  Sub Total :\n                  <br> TAX :\n                  <br> Total :\n                  <br>\n              </strong>\n          </p>\n      </div>\n      <div class=\"col-xs-2\">\n          <strong>\n              $" + subTotal + "\n              <br> $" + invoice.tax + "\n              <br> $" + total + "\n              <br>\n          </strong>\n      </div>\n  </div>\n</div>\n    ";
        return templateBody;
    },
    getInvoiceTemplate: function (templateBody, subTotal, total) {
        var html = "\n    <html>\n    <head>\n    <title> Invoice </title>\n    <link href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" rel=\"stylesheet\">\n     <style>\n     @import url(http://fonts.googleapis.com/css?family=Bree+Serif);\n     body, h1, h2, h3, h4, h5, h6{\n     font-family: 'Bree Serif', serif;\n     }\n     </style>\n    </head>\n    <body>\n       " + templateBody + "\n    </body>\n    </html>\n    ";
        return html;
    }
};
