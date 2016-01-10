<?php

namespace UMS;

return array(
    'controllers' => array(
        'invokables' => array(
            'UMS\Controller\Index' => 'UMS\Controller\IndexController',
        )
    ),
    'router' => array(
        'routes' => array(
            'ums' => array(
                'type' => 'Literal',
                'options' => array(
                    'route' => '/ums',
                    'defaults' => array(
                        'controller' => 'UMS\Controller\Index',
                        'action' => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type' => 'Segment',
                        'options' => array(
                            'route' => '/default[/:action]',
                            'constraints' => array(
                                'controller' => 'UMS\Controller\Index',
                                'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                                'action' => 'index',
                            ),
                        ),
                    ),
                ),
            ),
        ),
    ),
    'view_manager' => array(
        'template_map' => array(
            'application/layout' => __DIR__ . '/../view/layout/application-layout.phtml',
            'menu/template' => __DIR__ . '/../view/templates/menu.phtml',
            'header/template' => __DIR__ . '/../view/templates/header.phtml',
            'toolbar/template' => __DIR__ . '/../view/templates/toolbar.phtml',
        ),
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
    ),
    'view_helpers' => array(
        'invokables' => array(
            'userInfo' => 'UMS\View\Helper\UserInfo',
        ),
        'factories' => array(
            'navigation' => 'UMS\Factory\NavigationViewFactory',
        ),
    ),
    // menu with navigation
    'service_manager' => array(
        'factories' => array(
            'navigation' => 'Zend\Navigation\Service\DefaultNavigationFactory',
        ),
    ),
    'navigation' => array(
        'default' => array(
            array(
                'label' => 'Home',
                'route' => 'ums',
                'resource' => 'UMS\Controller\Index',
                'privilege' => 'index',
                'icon' => 'glyphicon glyphicon-home',
                'order' => 1,
            ),
        ),
    ),
);
