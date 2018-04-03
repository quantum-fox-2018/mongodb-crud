var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
    member: [{ type: mongoose.Schema.Types.ObjectId, ref: 'customer' }],
    days: Number,
    out_date: Date,
    due_date: Date,
    in_date: Date,
    fine: Number,
    booklist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }]
},{
    timestamps: true
});

mongoose.model('transaction', TransactionSchema);