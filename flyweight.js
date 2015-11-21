
// Flyweight optimized version
var Book = function ( title, author, genre, pageCount, publisherID, ISBN ) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pageCount = pageCount;
    this.publisherID = publisherID;
    this.ISBN = ISBN;
};

// Book Factory singleton
var BookFactory = (function () {
    var existingBooks = {}, existingBook;
    return {
        createBook: function ( title, author, genre, pageCount, publisherID, ISBN ) {
            existingBook = existingBooks[ISBN];
            if ( !!existingBook ) {
                return existingBook;
            } else {
                var book = new Book( title, author, genre, pageCount, publisherID, ISBN );
                existingBooks[ISBN] = book;
                return book;
            }
        }
    };

})();

// BookRecordManager singleton
var BookRecordManager = (function () {

    // simple storage singleton
    var storage = (function () {
        var data = {};
        return {
            add: function(id, attrubutes){
                data[id] = attrubutes
            },
            get: function(id){
                return data[id];
            },
            getAll: function(){
                return data
            }
        }
    })();

    return {
        addBookRecord: function ( id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability ) {
            var book = BookFactory.createBook( title, author, genre, pageCount, publisherID, ISBN );
            storage.add(id, {
                checkoutMember: checkoutMember,
                checkoutDate: checkoutDate,
                dueReturnDate: dueReturnDate,
                availability: availability,
                book: book
            });
        },
        updateCheckoutStatus: function ( bookID, newStatus, checkoutDate, checkoutMember, newReturnDate ) {
            var record = storage.get(bookID);
            record.availability = newStatus;
            record.checkoutDate = checkoutDate;
            record.checkoutMember = checkoutMember;
            record.dueReturnDate = newReturnDate;
        },
        extendCheckoutPeriod: function ( bookID, newReturnDate ) {
            storage.get(bookID).dueReturnDate = newReturnDate;
        },
        isPastDue: function ( bookID ) {
            var currentDate = new Date();
            return currentDate.getTime() > Date.parse( storage.get(bookID).dueReturnDate );
        },
        getAllRecords: function(){
            return storage.getAll();
        }
    };

})();

BookRecordManager.addBookRecord(
    'bookId1', 'title 1', 'author 1', 'genre 1', 100, 1, 'ISBN1',
    '01.12.2015', 'Alexander', '01.01.2016', false
);
BookRecordManager.addBookRecord(
    'bookId2', 'title 2', 'author 2', 'genre 2', 200, 2, 'ISBN2',
    '02.12.2015', 'Alexander', '02.01.2016', true
);

console.log(BookRecordManager.getAllRecords());

