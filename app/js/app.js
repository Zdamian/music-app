$(function() {

    var $btnGet = $('.app-get');
    var $btnGetAll = $('.app-get-all');
    var $btnPost = $('.app-post');
    var $btnPut = $('.app-put');
    var $btnDelete = $('.app-delete');

    var $inputArtist = $('.app-artist-input');
    var $inputAlbum = $('.app-album-input');
    var $list = $('.app-list');
    var $trackDetails = $('.app-track-details');

    $btnGetAll.on('click', function() {

        var $this = $(this);

        $this.addClass('disabled');

        $.ajax({
            url: 'http://localhost:5555/songs',
            method: 'GET',
            dataType: 'JSON',
            success: function(res) {
                console.log('success: ', res);
                $this.removeClass('disabled');
                $list.empty();

                var songs = res;
                songs.forEach(function(song) {
                    var dateAt = song.created_at;
                    var today = new Date(dateAt);
                    var day = today.getDate();
                    var month = today.getMonth() + 1;
                    var year = today.getFullYear();
                    var hour = today.getHours();
                    var minute = today.getMinutes();

                    if (hour < 10) hour = "0" + hour;

                    if (minute < 10) minute = "0" + minute;

                    var date = 'Music added: ' + day + "/" + month + "/" + year + " | " + hour + ":" + minute;

                    var $li = $('<li/>');
                    $li.attr('song-id', song._id);
                    $li.append('<span>' + song.artist + '</span>');
                    $li.append(' <i>' + date + '</i>');
                    $li.append(' <button class="app-get btn btn-primary">GET</button>');
                    $li.append(' <button class="app-put btn btn-default">PUT</button>');
                    $li.append(' <button class="app-delete btn btn-warning">DELETE</button>');
                    $list.append($li);
                });
            },
            error: function(err) {
                console.log('error: ', err);
                $this.removeClass('disabled');
            }
        });
    });

    $list.on('click', '.app-get', function() {

        var $this = $(this);

        $this.addClass('disabled');

        var id = $this.closest('li').attr('song-id');

        $.ajax({
            url: 'http://localhost:5555/songs/' + id,
            method: 'GET',
            dataType: 'JSON',
            success: function(res) {
                console.log('success: ', res);
                $this.removeClass('disabled');
                $trackDetails.empty();

                var song = res;

                var $details = $('<div/>');
                $details.attr('song-id', song._id);
                $details.append('<span>' + song.album + '</span>');
                $details.append(' <button class="app-get btn btn-primary">GET</button>');
                $details.append(' <button class="app-put btn btn-default">PUT</button>');
                $details.append(' <button class="app-delete btn btn-warning">DELETE</button>');
                $trackDetails.append($details);
            },
            error: function(err) {
                console.log('error: ', err);
                $this.removeClass('disabled');
            }
        });
    });

    $btnPost.on('click', function() {

        var $this = $(this);

        $this.addClass('disabled');

        var artist_text = $inputArtist.val();
        var album_text = $inputAlbum.val();

        $.ajax({
            url: 'http://localhost:5555/songs',
            method: 'POST',
            dataType: 'JSON',
            data: {
                'artist': artist_text,
                'album': album_text
            },
            success: function(res) {
                console.log('success: ', res);
                $this.removeClass('disabled');

                var song = res;

                var $li = $('<li/>');
                $li.attr('song-id', song._id);
                $li.append('<span>' + song.artist + '</span>');
                $li.append(' <i>' + song.created_at + '</i>');
                $li.append(' <button class="app-get btn btn-primary">GET</button>');
                $li.append(' <button class="app-put btn btn-default">PUT</button>');
                $li.append(' <button class="app-delete btn btn-warning">DELETE</button>');
                $list.append($li);

                $inputArtist.val('');
                $inputAlbum.val('');
            },
            error: function(err) {
                console.log('error: ', err);
                $this.removeClass('disabled');
            }
        });
    });

    $list.on('click', '.app-put', function() {

        var $this = $(this);

        $this.addClass('disabled');

        var id = $this.closest('li').attr('song-id');

        $.ajax({
            url: 'http://localhost:5555/songs/' + id,
            method: 'PUT',
            dataType: 'JSON',
            data: {
                'artist': 'hejka'
            },
            success: function(res) {
                console.log('success: ', res);
                $this.removeClass('disabled');

                var song = res;

                $this.closest('li').find('span').text(song.artist);
            },
            error: function(err) {
                console.log('error: ', err);
                $this.removeClass('disabled');
            }
        });
    });

    $list.on('click', '.app-delete', function() {

        var $this = $(this);

        $this.addClass('disabled');

        var id = $this.closest('li').attr('song-id');

        $.ajax({
            url: 'http://localhost:5555/songs/' + id,
            method: 'DELETE',
            dataType: 'JSON',
            success: function(res) {
                console.log('success: ', res);
                $this.removeClass('disabled');

                $this.closest('li').remove();
            },
            error: function(err) {
                console.log('error: ', err);
                $this.removeClass('disabled');
            }
        });
    });

    $(document).ready(function() {
        $('select').material_select();
    });

    $('.chips-placeholder').material_chip({
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Composer',
    });

    $('.chips-placeholder-country').material_chip({
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Country',
    });

});