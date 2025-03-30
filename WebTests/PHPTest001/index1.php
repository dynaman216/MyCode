<!DOCTYPE html>
<html>
    <head>
        <title>PHP Test</title>
        
        <style>
            /* Basic Reset */
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            /* Style for the navigation bar */
            .menu-bar {
                background-color: #333; /* Dark background for the menu */
                overflow: hidden;
                font-family: Arial, sans-serif;
                display: flex; /* Align menu items horizontally */
                justify-content: flex-start; /* Align left by default */
            }

            .menu-bar a {
                display: block;
                color: white;
                padding: 14px 20px;
                text-align: center;
                text-decoration: none;
                font-size: 16px;
            }

            .menu-bar a:hover {
                background-color: #ddd; /* Light gray on hover */
                color: black;
            }

            /* Dropdown Container */
            .dropdown {
                position: relative;
                display: inline-block;
            }

            .dropdown-content {
                display: none;
                position: absolute;
                background-color: #333;
                min-width: 160px;
                z-index: 1;
                top: 100%; /* Position dropdown below the parent */
                left: 0;
            }

            .dropdown-content a {
                color: white;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
            }

            .dropdown-content a:hover {
                background-color: #ddd;
                color: black;
            }

            .dropdown:hover .dropdown-content {
                display: block; /* Show dropdown when hovering over the parent */
            }

            /* Adding a responsive layout (mobile-friendly) */
            @media screen and (max-width: 600px) {
                .menu-bar a {
                    display: block;
                    text-align: left;
                    padding: 10px;
                }

                .dropdown-content {
                    position: static;
                    width: 100%;
                }
            }
        </style>
    </head>
    <body>
        <?php echo '<p>Hello World</p>'; ?>
        
        <div class="menu-bar">
            <a href="#home">Home</a>
            <a href="#about">About</a>

            <!-- Dropdown Menu -->
            <div class="dropdown">
                <a href="javascript:void(0)">File</a>
                <div class="dropdown-content">
                    <a href="#new">New</a>
                    <a href="#open">Open</a>
                    <a href="#save">Save</a>
                    <a href="#exit">Exit</a>
                </div>
            </div>

            <a href="#contact">Contact</a>
        </div>

        <h2>Content Goes Here</h2>
        <p>Click on the "File" dropdown to see the options.</p>
    </body>
</html>