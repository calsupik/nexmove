<?php

require('../vendor/autoload.php');

$app = new Silex\Application();
$app['debug'] = true;

// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => 'php://stderr',
));

// Register view rendering
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
));

// Register database
$dbopts = parse_url(getenv('DATABASE_URL'));
$app->register(new Csanquer\Silex\PdoServiceProvider\Provider\PDOServiceProvider('pdo'),
               array(
                'pdo.server' => array(
                   'driver'   => 'pgsql',
                   'user' => $dbopts["user"],
                   'password' => $dbopts["pass"],
                   'host' => $dbopts["host"],
                   'port' => $dbopts["port"],
                   'dbname' => ltrim($dbopts["path"],'/')
                   )
               )
);

// Our web handlers

// Default route
$app->get('/', function() use($app) {
  $app['monolog']->addDebug('logging output.');
  return $app['twig']->render('index.twig');
});

// 'locations' route
$app->get('/locations/', function() use($app) {
  $st = $app['pdo']->prepare('select * from locations where lat != null and lng != null and type != null');
  $st->execute();

  $locations = array();
  while ($row = $st->fetch(PDO::FETCH_ASSOC)) {
    $app['monolog']->addDebug('Row ' . $row['name']);
    $locations[] = $row;
  }

  return json_encode($locations);
});

// 'locations by id' route
$app->get('/locations/id/{id}', function($id) use($app) {
  $st = $app['pdo']->prepare('select * from locations where id = ' . $id);
  $st->execute();

  $locations = array();
  while ($row = $st->fetch(PDO::FETCH_ASSOC)) {
    $app['monolog']->addDebug('Row ' . $row['name']);
    $locations[] = $row;
  }

  return json_encode($locations);
});

// 'locations by type' route
$app->get('/locations/type/{type}', function($type) use($app) {
  $st = $app['pdo']->prepare('select * from locations where type = \'' . $type . '\'');
  $st->execute();

  $locations = array();
  while ($row = $st->fetch(PDO::FETCH_ASSOC)) {
    $app['monolog']->addDebug('Row ' . $row['name']);
    $locations[] = $row;
  }

  return json_encode($locations);
});

$app->run();
