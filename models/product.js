/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var util = require('../service/util');

/**
 * Product Schema
 */
var ProductSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'name cannot be blank'
  },
  image: {
    type: String,
    trim: true,
    required: 'image cannot be blank'
  },
  summary: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    default: 0,
    trim: true,
    required: 'price cannot be blank'
  },
  number: {
    type: Number,
    default: 0,
    required: 'number cannot be blank'
  },
  is_del: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: String
  },
  updated_at: {
    type: String
  },
});

/**
 *  自定义方法
 */
ProductSchema.methods.dudify = function() {
   this.name = this.name + ".suffix";
   return this.name;
};

//
ProductSchema.pre('save', function(next) {
  // get the current date
  var currentDate = util.formatTime(new Date());
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


module.exports = mongoose.model('Product', ProductSchema,'product');
