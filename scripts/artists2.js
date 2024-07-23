$(document).ready(function() {
    // Initialize DataTable with fuzzy search options and other configurations
    var table = $('#mytable').DataTable({ 
        fuzzySearch: { toggleSmart: false },
        // Add other configurations as needed
    });

    const AtoZ = document.querySelector('.dt-column-order');

    AtoZ.setAttribute("id","id-override-dt-column-order");


    // Event delegation for expandable rows
    $('#mytable tbody').on('click', '[id^="td-expand-"]', function() {
        var tdExpand = $(this);
        var expanded = tdExpand.attr('aria-expanded') === 'true';
        tdExpand.attr('aria-expanded', !expanded);
    });

    $('#mytable tbody').on('keydown', '[id^="td-expand-"]', function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            var tdExpand = $(this);
            var expanded = tdExpand.attr('aria-expanded') === 'true';
            tdExpand.attr('aria-expanded', !expanded);
        }
    });

    // Handle filtering by column using dropdown menu
    var uniqueValues = [];
    table.column(1).data().unique().sort().each(function(d) {
        uniqueValues.push(d);
    });

    $('#columnFilter').empty().append('<option value="">All</option>'); // Clear existing options
    uniqueValues.forEach(function(value) {
        $('#columnFilter').append('<option value="'+value+'">'+value+'</option>');
    });

    $('#columnFilter').on('change', function() {
        var selectedValue = $(this).val();
        if (selectedValue) {
            table.column(1).search('^' + selectedValue + '$', true, false).draw();
        } else {
            table.column(1).search('').draw();
        }
    });

    // Toggle custom sorting on and off - recently featured button
    $('#alpha-toggle').on('change', function() {
        if (this.checked) {
            table.order([3, 'natural']).draw();
        } else {
            table.order([3, 'asc']).draw();
        }
    });

    // Initially sort the table without custom sorting
    table.order([3, 'asc']).draw();
});

// FEATURED ARTIST ARROW BUTTON IMAGE CHANGE
(() => {
const button = document.querySelector('.artist-continue-link');
const artistDetails = document.querySelector('.artist-details');
const expandArrow = document.querySelector('.img-expand-arrow');
let expanded = false;

function expand() {
    if (!expanded) {
        expanded = true;
        artistDetails.setAttribute("aria-expanded", "true");
        expandArrow.setAttribute("src", "/images/expandarrowup.png");
    } else {
        expanded = false;
        artistDetails.setAttribute("aria-expanded", "false");
        expandArrow.setAttribute("src", "/images/expandarrowdown.png");
    }
}


button.addEventListener('click', expand);
button.addEventListener('keydown', function(event) {
    // Check if the key pressed is Enter (key code 13)
    if (event.key === 'Enter' || event.keyCode === 13) {
        expand();
    }
});



  window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var imageWrappers = document.querySelectorAll('.list-background-img');

    imageWrappers.forEach(function(imageWrapper) {
        // Calculate the amount of transform based on scroll position
        var translateY = scrollPosition / 8; // Adjust this value for desired effect

        // Apply the transform styles to each .list-background-img element
        imageWrapper.style.top = '-' + translateY + 'px';
    });
});


  

})();

