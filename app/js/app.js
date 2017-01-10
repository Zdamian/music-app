$(function() {

    var $btnGet = $('.app-get');
    var $btnGetAll = $('.app-get-all');
    var $btnPost = $('.app-post');
    var $btnPut = $('.app-put');
    var $btnDelete = $('.app-delete');

    var $inputArtist = $('.app-artist-input');
    var $inputTrack = $('.app-track-input');
    var $inputYear = $('.app-year-input');
    var $inputVideoMusic = $('.app-music-input');
    var $inputAlbum = $('.app-album-input');
    var $inputPoster = $('.app-poster-input');
    var $inputAlbumPoster = $('.app-album-poster-input');
    var $selGenres = $('.app-genres-select');
    var $selCountries = $('.app-countries');
    var $selComposers = $('.app-composers');
    var $list = $('.app-list');
    var $trackDetails = $('.app-track-details');
    var $form = $('.app-form');

    $.ajax({
        url: 'http://localhost:5555/songs',
        method: 'GET',
        dataType: 'JSON',
        success: function(res) {
            console.log('success: ', res);

            var songs = res;
            songs.forEach(function(song) {

                var $li = $('<li/>');
                $li.attr('song-id', song._id);
                $li.append('<span class="title">' + song.artist + ' - ' + song.track + '</span>');
                $li.append('<i class="app-get play small material-icons">play_circle_outline</i>');
                $li.append('<i class="app-get-details show-more small material-icons">info_outline</i>');
                // $li.append(' <i>' + date + '</i>');
                // $li.append(' <button class="app-get btn btn-primary">GET</button>');
                // $li.append(' <button class="app-put btn btn-default">PUT</button>');
                // $li.append(' <button class="app-delete btn btn-warning">DELETE</button>');
                $list.append($li);
            });
        },
        error: function(err) {
            console.log('error: ', err);
        }
    });

    $list.on('click', '.app-get-details', function() {

        var $this = $(this);
        var id = $this.closest('li').attr('song-id');

        $this.addClass('disabled');
        
        var dateAt = song.created_at;
        var dateCreated = new Date(dateAt);
        var dayAdded = dateCreated.getDate();
        var monthAdded = dateCreated.getMonth() + 1;
        var yearAdded = dateCreated.getFullYear();
        var hourAdded = dateCreated.getHours();
        var minuteAdded = dateCreated.getMinutes();

        if (hourAdded < 10) hourAdded = "0" + hourAdded;

        if (minuteAdded < 10) minuteAdded = "0" + minuteAdded;

        var dateAdded = 'Music added: ' + dayAdded + "/" + monthAdded + "/" + yearAdded + " | " + hourAdded + ":" + minuteAdded;

        $.ajax({
            url: 'http://localhost:5555/songs/' + id,
            method: 'GET',
            dataType: 'JSON',
            success: function(res) {
                console.log('success: ', res);
                $this.removeClass('disabled');
                $trackDetails.empty();
                $form.addClass('hide');

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

        var artist = $inputArtist.val();
        var trackName = $inputTrack.val();
        var year = $inputYear.val();
        var musicVideo = $inputVideoMusic.val();
        var albumName = $inputAlbum.val();
        var poster = $inputPoster.val();
        var album_poster = $inputAlbumPoster.val();

        var genres = [];
        var countries = [];
        var composers = [];

        $selGenres.find('option:selected').each(function(){
            genres.push($(this).text());
        });

        $selCountries.find('.chip').each(function(){
            $(this).find('i').remove();
            countries.push($(this).text());
        });

        $selComposers.find('.chip').each(function(){
            $(this).find('i').remove();
            composers.push($(this).text());
        });

        $.ajax({
            url: 'http://localhost:5555/songs',
            method: 'POST',
            dataType: 'JSON',
            data: {
                'artist': artist,
                'track': trackName,
                'composer': composers,
                'album': albumName,
                'genre': genres,
                'poster': poster,
                'album_poster': album_poster,
                'officialVideo': musicVideo,
                'country': countries,
                'year': year
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
                $inputTrack.val('');
                $inputYear.val('');
                $inputVideoMusic.val('');
                $inputAlbum.val('');
                $inputPoster.val('');
                $inputAlbumPoster.val('');

                $selCountries.find('.chip').each(function(){
                    $(this).remove();
                });

                $selComposers.find('.chip').each(function(){
                    $(this).remove();
                });
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

    $(document).ready(function(){
      $('.slider').slider({full_width: true});
    });

});