// 自增长函数
function getNextSequenceValue(sequenceName) {
    var sequenceDocument = db.counter.findAndModify({
        query: { taskId: sequenceName },
        update: { $inc: { sequenceValue: 1 } },
        "new": true
    });
    return sequenceDocument.sequenceValue;
}