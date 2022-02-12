<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @since             1.0.0
 * @package           Game_Jumping_Donut!
 *
 * @wordpress-plugin
 * Plugin Name:       Game Jumping Donut!
 * Plugin URI:        #
 * Description:        Плагин для внедрения игры Donut. Просто вставь шорткод в любое место сайта и игра заработает [insert_donut_game]
 * Version:           1.0.0
 * Author:            Rixak
 * Author URI:        #
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       game-jumping-donut-by-rixak
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC'))
{
	die;
}


// include game data
require plugin_dir_path(__FILE__) . 'includes/index.php';

// include ajax actions
require plugin_dir_path(__FILE__) . 'includes/actions.php';

















