<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="estilos/estiloPrincipal.css">

    <!--PWA los assets que publicara la pwa-->
    @laravelPWA


</head>

<body class="antialiased">
    <div
        class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">


        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">

            <div class="flex justify-center pt-8 sm:justify-start sm:pt-0">

                <h1 class="style-1">PROJECT OF LARAVEL TO PWA </h1>
            </div>
            <!--aqui termina la el titulo de LARAVEL-->



            <div class="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-2">
                    <div class="p-6">
                        <div class="flex items-center">
                            <img src="imagenes/artes-marciales.png" alt="">
                            <div class="ml-4 text-lg leading-7 font-semibold">
                                <a href="{{ route('portafolioKriling.index') }}"
                                    class="underline text-gray-900 dark:text-white">
                                    CV De Kriling Jarid
                                </a>
                            </div>
                        </div>

                        <div class="ml-12">
                            <div class="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                                Laravel has wonderful, thorough documentation covering every aspect of the framework.
                                Whether you are new to the framework or have previous experience with Laravel, we
                                recommend reading all of the documentation from beginning to end.
                            </div>
                        </div>
                    </div><!-- Aqui termina la infomrmacion de Kriling Jarid-->

                    <div class="p-6 border-t border-gray-200 dark:border-gray-700 md:border-t-0 md:border-l">
                        <div class="flex items-center">
                            <img src="imagenes/jugadores-de-futbol.png" alt="">
                            <div class="ml-4 text-lg leading-7 font-semibold">
                                <a href="{{ route('portafolioManuel.index') }}"
                                    class="underline text-gray-900 dark:text-white">CV De
                                    José Manuel</a>
                            </div>
                        </div>

                        <div class="ml-12">
                            <div class="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                                Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript
                                development. Check them out, see for yourself, and massively level up your development
                                skills in the process.
                            </div>
                        </div>
                    </div><!-- Aqui termina la infomrmacion de Jose Manuel-->

                    <div class="p-6 border-t border-gray-200 dark:border-gray-700">
                        <div class="flex items-center">
                            <img src="imagenes/game-console.png" alt="">
                            <div class="ml-4 text-lg leading-7 font-semibold">
                                <a href="{{ route('portafolioDavid.index') }}"
                                    class="underline text-gray-900 dark:text-white">CV
                                    De David</a>
                            </div>
                        </div>

                        <div class="ml-12">
                            <div class="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                                Laravel News is a community driven portal and newsletter aggregating all of the latest
                                and most important news in the Laravel ecosystem, including new package releases and
                                tutorials.
                            </div>
                        </div>
                    </div><!-- Aqui termina la infomrmacion de David-->

                    <div class="p-6 border-t border-gray-200 dark:border-gray-700 md:border-l">
                        <div class="flex items-center">
                            <img src="imagenes/arquitecto.png" alt="">
                            <div class="ml-4 text-lg leading-7 font-semibold">
                                <a href="{{ route('portafolioPaola.index') }}"
                                    class="underline text-gray-900 dark:text-white">CV
                                    De Paola</a>
                            </div>
                        </div>

                        <div class="ml-12">
                            <div class="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                                Laravel News is a community driven portal and newsletter aggregating all of the latest
                                and most important news in the Laravel ecosystem, including new package releases and
                                tutorials.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--esta son los 4 apartados de las cards principlales-->
        </div>
    </div>





</body>

</html>