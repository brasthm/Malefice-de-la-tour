//=============================================================================
// ICF-Soft Plugins - Time Utility
// ICFSoft_TimeUtil.js
//=============================================================================

var Imported = Imported || {};
Imported.ICFSoft_TimeUtil = true;

var ICF = ICF || {};
ICF.TimeUtil = ICF.TimeUtil || {};

ICF.TimeUtil.Version = 105; // 1.05

//=============================================================================
 /*:
 * @plugindesc v1.05 This plugin stores date and time in game variables
 * for diverse pourposes.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Year Var
 * @desc A variable where store year.
 * @default 0
 *
 * @param Month Var
 * @desc A variable where store month from 1 to 12.
 * @default 0
 *
 * @param Day Var
 * @desc A variable where store day from 1 to 31.
 * @default 0
 *
 * @param Hour Var
 * @desc A variable where store hour.
 * @default 0
 *
 * @param Minute Var
 * @desc A variable where store minute.
 * @default 0
 *
 * @param Week Var
 * @desc A variable where store the day of the week.
 * Week starts with Sunday as 0.
 * @default 0
 *
 * @param Month and day
 * @desc A variable where store a month and day combination.
 * @default 0
 *
 * @param Hour and minutes
 * @desc A variable where store a hour and minutes combination.
 * @default 0
 *
 * @param Time travel
 * @desc A variable where store a time offset.
 * @default 0
 *
 * @param Fixed Month and day
 * @desc All days you want to check separated with spaces.
 * Must be month and day combination (see help).
 * @default 101 102
 *
 * @param Fixed Integer checks
 * @desc Respective integers to store if there is dates are.
 * @default 0 0
 *
 * @param Variable Month and day
 * @desc All variables where days you want to check are stored separated
 * with spaces. Must be stored as month and day combination (see help).
 * @default 
 *
 * @param Variable Integer checks
 * @desc Respective integers to store if there is dates are.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * There are games where special things happen on specific day of the week,
 * specific hour, specific day, and so on. 
 * There are games where time continues even when off.
 * 
 * With this plugin you can do both.
 * 
 * Time is stored in game variables and can be used inside events. Also uses
 * switches to check specified days. Automatically updates on map changes, but
 * can also be updated manually.
 * A gameplay time has been added for those who want an alternative to
 * real time.
 * 
 * Also you can store time and check how many real time has passed.
 * Time is stored as minutes.
 * 
 * ============================================================================
 * Parameters
 * ============================================================================
 * 
 * There are six basic params to store current year, day, hour, etc.
 * These params indicate what variables will be used to store that info.
 * To skip a param put 0.
 * 
 * Month and day comes in a special format because events can use only one
 * variable per page. So it needs a combined one. Is Month*100 + Day.
 * Some Month-Day Examples:
 *   -  101: January 1st
 *   -  102: January 2nd
 *   -  201: February 1st
 *   -  211: February 11th
 *   - 1001: October 1st
 *   - 1010: October 10th
 * 
 * Hours and minutes works as month and day does. Is Hour*100 + minute.
 * 
 * Fixed Month and day: To check specified days sepparated by spaces.
 * It's combined with next parameter.
 * 
 * Fixed Integer checks: Switchs sepparated by spaces. There is a switch
 * for every fixed date. When day is met it's switch becomes on, when not
 * it's switch becomes off.
 * 
 * Variable Month and day: To check inside specified variable a day.
 * It can be used to store a day ingame and check when is met. Example: B-Day
 * Variables are sepparated by spaces.
 * 
 * Variable Integer checks: Switchs sepparated by spaces. There is a switch
 * for every variable. When stored day is met it's switch becomes on, when
 * not it's switch becomes off.
 * 
 * ============================================================================
 * Plugin commands
 * ============================================================================
 * 
 * GetTime x
 * 
 *  - To store a time into variable number 'x'.
 * 
 * GetTimeSince x y
 * GetHoursSince x y
 * GetDaysSince x y
 * 
 *  - To compare how much time passed since 'x' in minutes, hours or days
 *    and store result in variable 'y'.
 * 
 * GetPlayTime x
 * 
 *  - To store gameplay time into variable number 'x'.
 * 
 * GetPlayTimeSince x y
 * GetPlayHoursSince x y
 * GetPlayDaysSince x y
 * 
 *  - To compare how much gameplay time passed since 'x' in minutes, hours
 *    or days and store result in variable 'y'.
 * 
 * UpdateTime
 * 
 *  - To update time variables manually.
 * 
 * GoPresent [true]
 * 
 *  - To reset time. Returning to present.
 *  - Optional: placing 'true' will update map automatically.
 *    
 * AdvanceTime x [true]
 * AdvanceDays x [true]
 * AdvanceYears x [true]
 * 
 *  - To advance x minutes, days or years in time (can be negative).
 *  - Optional: placing 'true' will update map automatically.
 * 
 * addrtimer name [ce x] time trigger
 * 
 *  - Add a real time timer. See below for name, time and trigger codes.
 *    By including ce and a number a common event will run.
 * 
 * removertimer name
 * 
 *  - Removes specified real timer.
 * 
 * hasrtimer name x
 * 
 *  - Checks if a real timer is set and stores result in a switch.
 * 
 * realtimeleft name x
 * 
 *  - Checks how many real time left and stores result in a variable.
 * 
 * NAME CODES FOR TIMERS:
 * 
 * A timer name can be a name without spaces that can be preceded by a code.
 * When using a code you can use selfswitches or selfvariables. 
 * 
 * [code] name
 * 
 * this name
 * 
 *  - Attach timer to current event.
 * 
 * map name
 * 
 *  - Attach timer to current map.
 * 
 * actor id name
 * 
 *  - Attach timer to specified actor.
 * 
 * member position name
 * 
 *  - Attach timer to specified party member starting by 0.
 * 
 * enemy id name
 * 
 *  - Attach timer to an enemy type/id.
 * 
 * custom x x name
 * 
 *  - Attach timer to a custom code that can be used as remote events.
 * 
 * 
 * TIME CODES FOR TIMERS:
 * 
 * You can use one or both of them.
 * [offset] [fixed]
 * 
 * Offset is used to check how many time must pass to trigger.
 * You can place only one.
 * 
 * x
 * minutes x
 * hours x
 * days x
 * 
 *  - Offset in seconds, minutes, hours or days.
 * 
 * Fixed allows you to edit at wich second, minute, hour or day should
 * trigger. You can use all you'll need.
 * 
 * set x
 * setminutes x
 * sethours x
 * setdays x
 * 
 * Some examples:
 * 
 * days 5 sethours 19 setminutes 0
 * 500
 * minutes 15 set 0
 * 
 * 
 * TRIGGER CODES FOR TIMERS:
 * 
 * switchon x
 * switchoff x
 * switchtoogle x
 * 
 *  - Set on, off or toogle specified switch.
 * 
 * selfswitchon
 * selfswitchoff
 * selfswitchtoogle
 * 
 *  - Set on, off or toogle selfswitch given by previous defined name.
 * 
 * variable x value
 * increasevariable x value
 * multiplyvariable x value
 * dividevariable x value
 * modvariable x value
 * 
 *  - Set, increase, multiply, divide or mod specified variable by value.
 * 
 * selfvariable value
 * increaseselfvariable value
 * multiplyselfvariable value
 * divideselfvariable value
 * modselfvariable value
 * 
 *  - Set, increase, multiply, divide or mod selfvariable given by previous
 *    defined name with a value.
 * 
 * eval javascript code
 * 
 *  - Execute specified javascript code.
 * 
 * ============================================================================
 * Scripting functions
 * ============================================================================
 * 
 * For those who prefer scripting over plugin commands there are the
 * alternate versions.
 * 
 * ICF.TimeUtil.GetTime(x)
 * ICF.TimeUtil.GetTimeSince(x, y)
 * ICF.TimeUtil.GetHoursSince(x, y)
 * ICF.TimeUtil.GetDaysSince(x, y)
 * ICF.TimeUtil.GetPlayTime(x)
 * ICF.TimeUtil.GetPlayTimeSince(x, y)
 * ICF.TimeUtil.GetPlayHoursSince(x, y)
 * ICF.TimeUtil.GetPlayDaysSince(x, y)
 * ICF.TimeUtil.GetDate()
 * ICF.TimeUtil.GoPresent(x)
 * ICF.TimeUtil.AdvanceTime(x, true)
 * ICF.TimeUtil.AdvanceDays(x, true)
 * ICF.TimeUtil.AdvanceYears(x, true)
 * 
 * ============================================================================
 * Incompatibilities
 * ============================================================================
 * 
 * There's no known incompatible plugins yet.
 * 
 * ============================================================================
 * Known isues
 * ============================================================================
 * 
 * There's no known isues yet.
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.05:
 * - Added timers for real time.
 *
 * Version 1.04:
 * - Added functions for gameplay time.
 *
 * Version 1.03:
 * - Use of ICF-Soft Main Utility.
 * - Added hour and minutes combination.
 *
 * Version 1.02:
 * - Added day check with switchs.
 *
 * Version 1.01:
 * - Added time travel utility.
 *
 * Version 1.00:
 * - Finished plugin!
 * 
 * ============================================================================
 * 
 * For commercial and non-commercial games.
 * Credit to ICF-Soft.
 * This entire header must be included with plugin.
 * 
 * ============================================================================
*/
//=============================================================================
 /*:es
 * @plugindesc v1.05 Este complemento almacena la fecha y hora en las variables
 * del juego para diversos propósitos.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Year Var
 * @desc La variable donde almacenas el año.
 * @default 0
 *
 * @param Month Var
 * @desc La variable donde almacenas el mes (de 1 a 12).
 * @default 0
 *
 * @param Day Var
 * @desc La variable donde almacenas el día (de 1 a 31).
 * @default 0
 *
 * @param Hour Var
 * @desc La variable donde almacenas la hora.
 * @default 0
 *
 * @param Minute Var
 * @desc La variable donde almacenas los minutos.
 * @default 0
 *
 * @param Week Var
 * @desc La variable donde almacenas el día de la semana.
 * La semana empieza con el domingo como 0.
 * @default 0
 *
 * @param Month and day
 * @desc Una variable especial donde se almacena una combinación de mes y día.
 * @default 0
 *
 * @param Hour and minutes
 * @desc Una variable especial donde se almacena una combinación de horas
 * y minutos.
 * @default 0
 *
 * @param Time travel
 * @desc Una variable en donde almacenar el salto en el tiempo.
 * @default 0
 *
 * @param Fixed Month and day
 * @desc Los días que quieres comprobar separados por espacios.
 * Debe ser combinación mes-día (ver ayuda).
 * @default 101 102
 *
 * @param Fixed Integer checks
 * @desc Interruptores respectivos para ver si se cumple la fecha.
 * @default 0 0
 *
 * @param Variable Month and day
 * @desc Las variables en donde se almacenan los días que quieres comprobar
 * separados por espacios. Se almacenan en combinación mes-día (ver ayuda).
 * @default 
 *
 * @param Variable Integer checks
 * @desc Interruptores respectivos para ver si se cumple la fecha.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introducción
 * ============================================================================
 * 
 * Hay juegos en donde ciertos eventos solo pasan en un día, día de la semana,
 * hora o incluso minuto específico. 
 * También los hay en los que el tiempo pasa aunque no estés jugando.
 * 
 * Con este complemento puedes hacer ambas cosas.
 * 
 * El tiempo se almacena en variables a las que se puede acceder en los eventos.
 * También se puede usar interruptores para comprobar fechas.
 * Se actualiza en cada cambio de mapa, pero también con comando.
 * Se ha añadido la posibilidad de usar tiempo de juego como alternativa al
 * tiempo real.
 * 
 * Además puedes guardar una fecha y comparar cuanto tiempo real ha pasado.
 * El tiempo se almacena en minutos.
 * 
 * ============================================================================
 * Parámetros
 * ============================================================================
 * 
 * Hay seis parámetros básicos donde almacenar el año, mes, día, hora, etc.
 * Indican qué variables se van a utilizar para almacenar esa info.
 * Para saltar un parámetro dejar en 0.
 * 
 * Month and day comes usa un formato especial porque los eventos solo pueden
 * usar una variable por página. Así que necesita una combinada.
 * Viene en Mes*100 + Día.
 * Algunos ejemplos:
 *   -  101: 1  de Enero
 *   -  102: 2  de Enero
 *   -  201: 1  de Febrero
 *   -  211: 11 de Febrero
 *   - 1001: 1  de Octubre
 *   - 1010: 10 de Octubre
 * 
 * Hours and minutes funciona como el anterior. Is Hora*100 + minutos.
 * 
 * Fixed Month and day: Para comprobar días separados por espacios.
 * Está en combinación con el siguiente parámetro.
 * 
 * Fixed Integer checks: Interruptores separados por espacios. Un interruptor
 * para cada fecha. En ese día su interruptor está activado, cuando no,
 * está desactivado.
 * 
 * Variable Month and day: Para comprobar la fecha almacenada en variables.
 * Se utiliza para guardar un día y comprobar si es ese día. Se puede usar
 * por ejemplo para guardar una fecha de cumpleaños. Las variables se
 * separan por espacios.
 * 
 * Variable Integer checks: Interruptores separados por espacios. Un
 * interruptor para cada variable. Si el día almacenado se cumple su
 * interruptor estará activado, cuando no, estará desactivado.
 * 
 * ============================================================================
 * Comandos de complemento
 * ============================================================================
 * 
 * GetTime x
 * 
 *  - Para almacenar el tiempo en la variable número 'x'.
 * 
 * GetTimeSince x y
 * GetHoursSince x y
 * GetDaysSince x y
 * 
 *  - Para comparar cuanto tiempo ha pasado desde 'x' en minutos, horas o
 *    días y almacenar el resultado en la variable 'y'.
 * 
 * GetPlayTime x
 * 
 *  - Para almacenar el tiempo de juego en la variable número 'x'.
 * 
 * GetPlayTimeSince x y
 * GetPlayHoursSince x y
 * GetPlayDaysSince x y
 * 
 *  - Para comparar cuanto tiempo de juego ha pasado desde 'x' en minutos,
 *    horas o días y almacenar el resultado en la variable 'y'.
 * 
 * UpdateTime
 * 
 *  - Para actualizar manualmente las variables.
 * 
 * GoPresent [true]
 * 
 *  - Para reiniciar el tiempo. Volver al presente.
 *    Opcional: poniendo 'true' las variables se actualizarán.
 *    
 * AdvanceTime x [true]
 * AdvanceDays x [true]
 * AdvanceYears x [true]
 * 
 *  - Para avanzar x minutos, días o años en el tiempo (puede ser negativo).
 *    Opcional: poniendo 'true' las variables se actualizarán.
 * 
 * addrtimer name [ce x] time trigger
 * 
 *  - Añade un temporizador de tiempo real. Ver abajo los códigos de name,
 *    time y trigger. Incluyendo ce y un número se puede llamar un evento
 *    común.
 * 
 * removertimer name
 * 
 *  - Elimina el temporizador específico.
 * 
 * hasrtimer name x
 * 
 *  - Comprueba si existe el temporizador y almacena el resultado en un
 *    interruptor.
 * 
 * realtimeleft name x
 * 
 *  - Comprueba cuanto tiempo falta para que salte el temporizador y almacena
 *    el resultado en una variable.
 * 
 * CÓDIGOS DE NOMBRES PARA TEMPORIZADORES:
 * 
 * El nombre de un temporizador no lleva espacios a menos que venga precedido
 * por un código. Los nombres con código permiten el uso de interruptores y
 * variables locales.
 * 
 * [code] name
 * 
 * this name
 * 
 *  - Vincula el temporizador al evento actual.
 * 
 * map name
 * 
 *  - Vincula el temporizador al mapa en el que se encuentra.
 * 
 * actor id name
 * 
 *  - Vincula el temporizador al actor específico.
 * 
 * member position name
 * 
 *  - Vincula el temporizador al personaje que se encuentra en un
 *    posición específica del grupo empezando por el 0.
 * 
 * enemy id name
 * 
 *  - Vincula el temporizador al tipo/id del enemigo.
 * 
 * custom x x name
 * 
 *  - Modo personalizado de vincular un temporizador. Puede usarse
 *    para eventos remotos.
 * 
 * 
 * CÓDIGOS DE TIEMPO PARA TEMPORIZADORES:
 * 
 * Pueden usarse uno o ambos.
 * [offset] [fixed]
 * 
 * Offset es el tiempo que tiene que tardar el temporizador.
 * Sólo se pone uno.
 * 
 * x
 * minutes x
 * hours x
 * days x
 * 
 *  - Segundos, minutos, horas y días.
 * 
 * Fixed permite cambiar el segundo, minuto hora y día en el que debe
 * terminar el temporizador. Puedes usar todos los necesarios.
 * 
 * set x
 * setminutes x
 * sethours x
 * setdays x
 * 
 * Algunos ejemplos:
 * 
 * days 5 sethours 19 setminutes 0
 * 500
 * minutes 15 set 0
 * 
 * 
 * CÓDIGOS DE EFECTOS PARA TEMPORIZADORES:
 * 
 * switchon x
 * switchoff x
 * switchtoogle x
 * 
 *  - Activa, desactiva o alterna el interruptor específico.
 * 
 * selfswitchon
 * selfswitchoff
 * selfswitchtoogle
 * 
 *  - Activa, desactiva o alterna el interruptor definido previamente
 *    por el nombre del temporizador.
 * 
 * variable x value
 * increasevariable x value
 * multiplyvariable x value
 * dividevariable x value
 * modvariable x value
 * 
 *  - Cambia, incrementa, multiplica, divide o resto de la variable
 *    específica.
 * 
 * selfvariable value
 * increaseselfvariable value
 * multiplyselfvariable value
 * divideselfvariable value
 * modselfvariable value
 * 
 *  - Cambia, incrementa, multiplica, divide o resto de la variable
 *    definida previamente por el nombre del temporizador.
 * 
 * eval javascript code
 * 
 *  - Ejecuta código javascript.
 * 
 * ============================================================================
 * Funciones de script
 * ============================================================================
 * 
 * Para aquellos que usar javascript en lugar de usar los comandos de
 * complementos éstas son las versiones alternativas.
 * 
 * ICF.TimeUtil.GetTime(x)
 * ICF.TimeUtil.GetTimeSince(x, y)
 * ICF.TimeUtil.GetHoursSince(x, y)
 * ICF.TimeUtil.GetDaysSince(x, y)
 * ICF.TimeUtil.GetPlayTime(x)
 * ICF.TimeUtil.GetPlayTimeSince(x, y)
 * ICF.TimeUtil.GetPlayHoursSince(x, y)
 * ICF.TimeUtil.GetPlayDaysSince(x, y)
 * ICF.TimeUtil.GetDate()
 * ICF.TimeUtil.GoPresent(x)
 * ICF.TimeUtil.AdvanceTime(x, true)
 * ICF.TimeUtil.AdvanceDays(x, true)
 * ICF.TimeUtil.AdvanceYears(x, true)
 * 
 * ============================================================================
 * Incompatibilidades
 * ============================================================================
 * 
 * No se conocen complementos que sean incompatibles hasta la fecha.
 * 
 * ============================================================================
 * Problemas conocidos
 * ============================================================================
 * 
 * No hay problemas hasta la fecha.
 * 
 * ============================================================================
 * Historial de versiones
 * ============================================================================
 *
 * Versión 1.05:
 * - Se han añadido temporizadores de tiempo real.
 * 
 * Versión 1.04:
 * - Se han añadido funciones para comprobar el tiempo de juego.
 * 
 * Versión 1.03:
 * - Se epieza a utilizar el ICF-Soft Main Utility.
 * - Se ha añadido una combinación de hora y minutos.
 * 
 * Versión 1.02:
 * - Se ha añadido una función de fechas con interruptores.
 * 
 * Versión 1.01:
 * - Se ha añadido la utilidad de viaje en el tiempo.
 * 
 * Versión 1.00:
 * - Complemento terminado.
 * 
 * ============================================================================
 * 
 * Para juegos comerciales y no comerciales.
 * Se debe incluir a ICF-Soft en los créditos.
 * Esta cabecera debe incluirse íntegramente con el plugin.
 * 
 * ============================================================================
*/
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

ICF.Parameters = PluginManager.parameters('ICFSoft_TimeUtil');
ICF.Param = ICF.Param || {};

ICF.Param.TimeVars = [];
ICF.Param.TimeVars[0] = Number(ICF.Parameters['Year Var']);
ICF.Param.TimeVars[1] = Number(ICF.Parameters['Month Var']);
ICF.Param.TimeVars[2] = Number(ICF.Parameters['Day Var']);
ICF.Param.TimeVars[3] = Number(ICF.Parameters['Hour Var']);
ICF.Param.TimeVars[4] = Number(ICF.Parameters['Minute Var']);
ICF.Param.TimeVars[5] = Number(ICF.Parameters['Week Var']);
ICF.Param.TimeVars[6] = Number(ICF.Parameters['Month and day']);
ICF.Param.TimeVars[7] = Number(ICF.Parameters['Hour and minutes']);

ICF.Param.TimeTravel = Number(ICF.Parameters['Time travel']);

ICF.Param.TimeFixedData = ICF.Parameters['Fixed Month and day'].split(/\s+/).leaveNumbers();
ICF.Param.TimeFixedInt = ICF.Parameters['Fixed Integer checks'].split(/\s+/).leaveNumbers().reduceToFit(ICF.Param.TimeFixedData);
ICF.Param.TimeVarsData = ICF.Parameters['Variable Month and day'].split(/\s+/).leaveNumbers();
ICF.Param.TimeVarsInt = ICF.Parameters['Variable Integer checks'].split(/\s+/).leaveNumbers().reduceToFit(ICF.Param.TimeVarsData);

if (!Imported.ICFSoft_MainUtility) {throw new Error('This plugin requires ICF-Soft Main Utility plugin to work.\nYou can download it at icfsoft.blogspot.com inside plugins section.');}

//=============================================================================
// Time Utilities
//=============================================================================

ICF.TimeUtil.GetTime = function(varid) {
	var Today = new Date();
	Today.increaseMinutes($gameVariables.value(ICF.Param.TimeTravel));
	$gameVariables.setValue(varid, parseInt(Today.getTime()/60000));
}

ICF.TimeUtil.GetTimeSince = function(varid, resid) {
	var Today = new Date();
	Today.increaseMinutes($gameVariables.value(ICF.Param.TimeTravel));
	if (resid == undefined) {return (parseInt(Today.getTime()/60000) - $gameVariables.value(varid));}
	$gameVariables.setValue(resid, parseInt(Today.getTime()/60000) - $gameVariables.value(varid));
}

ICF.TimeUtil.GetHoursSince = function(varid, resid) {
	if (resid == undefined) {return parseInt(ICF.TimeUtil.GetTimeSince(varid)/60)};
	var Today = new Date();
	Today.increaseMinutes($gameVariables.value(ICF.Param.TimeTravel));
	$gameVariables.setValue(resid, parseInt(((Today.getTime()/60000) - $gameVariables.value(varid))/60));
}

ICF.TimeUtil.GetDaysSince = function(varid, resid) {
	if (resid == undefined) {return parseInt(ICF.TimeUtil.GetTimeSince(varid)/1440)};
	var Today = new Date();
	Today.increaseMinutes($gameVariables.value(ICF.Param.TimeTravel));
	$gameVariables.setValue(resid, parseInt(((Today.getTime()/60000) - $gameVariables.value(varid))/1440));
}

ICF.TimeUtil.GetPlayTime = function(varid) {
	var Today = $gameSystem.playtime();
	$gameVariables.setValue(varid, parseInt(Today));
}

ICF.TimeUtil.GetPlayTimeSince = function(varid, resid) {
	var Today = $gameSystem.playtime();
	if (resid == undefined) {return parseInt(Today - $gameVariables.value(varid));}
	$gameVariables.setValue(resid, parseInt(Today - $gameVariables.value(varid)));
}

ICF.TimeUtil.GetPlayHoursSince = function(varid, resid) {
	if (resid == undefined) {return parseInt(ICF.TimeUtil.GetPlayTimeSince(varid)/60)};
	var Today = $gameSystem.playtime();
	$gameVariables.setValue(resid, parseInt((Today - $gameVariables.value(varid))/60));
}

ICF.TimeUtil.GetPlayDaysSince = function(varid, resid) {
	if (resid == undefined) {return parseInt(ICF.TimeUtil.GetPlayTimeSince(varid)/1440)};
	var Today = $gameSystem.playtime();
	$gameVariables.setValue(resid, parseInt((Today - $gameVariables.value(varid))/1440));
}

ICF.TimeUtil.GetDate = function() {
	var Today = new Date();
	ICF.TimeUtil.Today = Today.getMonthAndDay();
	Today.increaseMinutes($gameVariables.value(ICF.Param.TimeTravel));
	ICF.TimeUtil.Day = Today.getMonthAndDay();
	if (ICF.Param.TimeVars[0] > 0) {$gameVariables.setValue(ICF.Param.TimeVars[0], Today.getFullYear());}
	if (ICF.Param.TimeVars[1] > 0) {$gameVariables.setValue(ICF.Param.TimeVars[1], Today.getMonth() + 1);}
	if (ICF.Param.TimeVars[2] > 0) {$gameVariables.setValue(ICF.Param.TimeVars[2], Today.getDate());}
	if (ICF.Param.TimeVars[3] > 0) {$gameVariables.setValue(ICF.Param.TimeVars[3], Today.getHours());}
	if (ICF.Param.TimeVars[4] > 0) {$gameVariables.setValue(ICF.Param.TimeVars[4], Today.getMinutes());}
	if (ICF.Param.TimeVars[5] > 0) {$gameVariables.setValue(ICF.Param.TimeVars[5], Today.getDay());}
	if (ICF.Param.TimeVars[6] > 0) {$gameVariables.setValue(ICF.Param.TimeVars[6], ICF.TimeUtil.Day);}
	if (ICF.Param.TimeVars[7] > 0) {$gameVariables.setValue(ICF.Param.TimeVars[7], Today.getHourAndMinute());}

}

ICF.TimeUtil.GoPresent = function(updating) {
	$gameVariables.setValue(ICF.Param.TimeTravel, 0);
	if (updating) {ICF.TimeUtil.GetDate();}
}

ICF.TimeUtil.AdvanceTime = function(minutes, updating) {
	if (minutes == undefined) {minutes = 1} 
	$gameVariables.setValue(ICF.Param.TimeTravel, $gameVariables.value(ICF.Param.TimeTravel) + minutes);
	if (updating) {ICF.TimeUtil.GetDate();}
}

ICF.TimeUtil.AdvanceDays = function(days, updating) {
	if (days == undefined) {days = 1} 
	$gameVariables.setValue(ICF.Param.TimeTravel, $gameVariables.value(ICF.Param.TimeTravel) + days * 1440);
	if (updating) {ICF.TimeUtil.GetDate();}
}

ICF.TimeUtil.AdvanceYears = function(years, updating) {
	if (years == undefined) {years = 1} 
	$gameVariables.setValue(ICF.Param.TimeTravel, $gameVariables.value(ICF.Param.TimeTravel) + years * 525960);
	if (updating) {ICF.TimeUtil.GetDate();}
}

//=============================================================================
// Game_Interpreter
//=============================================================================

ICF.TimeUtil.pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
        ICF.TimeUtil.pluginCommand.call(this, command, args);
	if (command.toLowerCase() === 'gettime') {
		ICF.TimeUtil.GetTime(args[0]);
	} else if (command.toLowerCase() == 'gettimesince') {
		ICF.TimeUtil.GetTimeSince(args[0], args[1]);
	} else if (command.toLowerCase() == 'gethourssince') {
		ICF.TimeUtil.GetHoursSince(args[0], args[1]);
	} else if (command.toLowerCase() == 'getdayssince') {
		ICF.TimeUtil.GetDaysSince(args[0], args[1]);
	} else if (command.toLowerCase() === 'getplaytime') {
		ICF.TimeUtil.GetPlayTime(args[0]);
	} else if (command.toLowerCase() == 'getplaytimesince') {
		ICF.TimeUtil.GetPlayTimeSince(args[0], args[1]);
	} else if (command.toLowerCase() == 'getplayhourssince') {
		ICF.TimeUtil.GetPlayHoursSince(args[0], args[1]);
	} else if (command.toLowerCase() == 'getplaydayssince') {
		ICF.TimeUtil.GetPlayDaysSince(args[0], args[1]);
        } else if (command.toLowerCase() == 'updatetime') {
		ICF.TimeUtil.GetDate();
        } else if (command.toLowerCase() == 'gopresent') {
		ICF.TimeUtil.GoPresent(args[0]);
	} else if (command.toLowerCase() == 'advancetime') {
		ICF.TimeUtil.AdvanceTime(args[0], args[1]);
	} else if (command.toLowerCase() == 'advancedays') {
		ICF.TimeUtil.AdvanceDays(args[0], args[1]);
        } else if (command.toLowerCase() == 'advanceyears') {
		ICF.TimeUtil.AdvanceYears(args[0], args[1]);
        } else if (command.toLowerCase() == 'addrtimer') {
		var name = args.shift().toLowerCase();
		if (name == "this") name = [this._mapId, this._eventId, args.shift().toLowerCase()];
		else if (name == "map") name = [this._mapId, 0, args.shift().toLowerCase()];
		else if (name == "actor") name = [0, Number(args.shift()), args.shift().toLowerCase()];
		else if (name == "enemy") name = ["e", Number(args.shift()), args.shift().toLowerCase()];
		else if (name == "custom") name = [args.shift(), args.shift(), args.shift().toLowerCase()];
		else if (name == "member") {
		    name = [0, Number(args.shift()), args.shift().toLowerCase()];
		    if (!$gameParty.allMembers()[name[1]]) return;
		    name[1] = $gameParty.allMembers()[name[1]].actorId();
		}
		var timer = [0,0,0,0,0];
		var code = args.shift().toLowerCase();
		if (code == "ce") {
		    timer[4] = Number(args.shift());
		    code = args.shift().toLowerCase();
		}
		var date = new Date();
		if (!isNaN(Number(code))) {
		    date.setSeconds(date.getSeconds() + Number(code));
		    code = args.shift().toLowerCase();
		} else if (code == "minutes") {
		    date.setMinutes(date.getMinutes() + Number(args.shift()));
		    code = args.shift().toLowerCase();
		} else if (code == "hours") {
		    date.setHours(date.getHours() + Number(args.shift()));
		    code = args.shift().toLowerCase();
		} else if (code == "days") {
		    date.setDays(date.getDays() + Number(args.shift()));
		    code = args.shift().toLowerCase();
		}
		while (["set","setminutes","sethours","setdays"].contains(code)) {
		    if (code == "set") date.setSeconds(Number(args.shift()));
		    else if (code == "setminutes") date.setMinutesNumber(args.shift()));
		    else if (code == "sethours") date.setHours(Number(args.shift()));
		    else if (code == "setdays") date.setDays(Number(args.shift()));
		    code = args.shift().toLowerCase();
		}
		timer[0] = Math.trunc(date.getTime() / 1000);
		timer[1] = code;
		if (code == "eval") timer[2] = args.join(" ");
		else if (code == "switchon") timer[2] = Number(args.shift());
		else if (code == "switchoff") timer[2] = Number(args.shift());
		else if (code == "switchtoogle") timer[2] = Number(args.shift());
		else if (code == "variable") {
			timer[2] = Number(args.shift());
			timer[3] = Number(args.shift());
		} else if (code == "increasevariable") {
			timer[2] = Number(args.shift());
			timer[3] = Number(args.shift());
		} else if (code == "multiplyvariable") {
			timer[2] = Number(args.shift());
			timer[3] = Number(args.shift());
		} else if (code == "dividevariable") {
			timer[2] = Number(args.shift());
			timer[3] = Number(args.shift());
		} else if (code == "modvariable") {
			timer[2] = Number(args.shift());
			timer[3] = Number(args.shift());
		} else if (code == "selfvariable") timer[3] = Number(args.shift());
		else if (code == "increaseselfvariable") timer[3] = Number(args.shift());
		else if (code == "multiplyselfvariable") timer[3] = Number(args.shift());
		else if (code == "divideselfvariable") timer[3] = Number(args.shift());
		else if (code == "modselfvariable") timer[3] = Number(args.shift());
		$gameTimer.addRTimer(timer, name);
	} else if (command.toLowerCase() == 'removertimer') {
		var name = args.shift().toLowerCase();
		if (name == "this") name = [this._mapId, this._eventId, args.shift().toLowerCase()];
		else if (name == "map") name = [this._mapId, 0, args.shift().toLowerCase()];
		else if (name == "actor") name = [0, Number(args.shift()), args.shift().toLowerCase()];
		else if (name == "enemy") name = ["e", Number(args.shift()), args.shift().toLowerCase()];
		else if (name == "custom") name = [args.shift(), args.shift(), args.shift().toLowerCase()];
		else if (name == "member") {
		    name = [0, Number(args.shift()), args.shift().toLowerCase()];
		    if (!$gameParty.allMembers()[name[1]]) return;
		    name[1] = $gameParty.allMembers()[name[1]].actorId();
		}
		$gameTimer.deleteRTimer(name);
	} else if (command.toLowerCase() == 'hasrtimer') {
		var name = args.shift().toLowerCase();
		if (name == "this") name = [this._mapId, this._eventId, args.shift().toLowerCase()];
		else if (name == "map") name = [this._mapId, 0, args.shift().toLowerCase()];
		else if (name == "actor") name = [0, Number(args.shift()), args.shift().toLowerCase()];
		else if (name == "enemy") name = ["e", Number(args.shift()), args.shift().toLowerCase()];
		else if (name == "custom") name = [args.shift(), args.shift(), args.shift().toLowerCase()];
		else if (name == "member") {
		    name = [0, Number(args.shift()), args.shift().toLowerCase()];
		    if (!$gameParty.allMembers()[name[1]]) return;
		    name[1] = $gameParty.allMembers()[name[1]].actorId();
		}
		$gameSwitches.setValue(Number(args.shift()), $gameTimer.hasRTimer(name));
	} else if (command.toLowerCase() == 'realtimeleft') {
		var name = args.shift().toLowerCase();
		if (name == "this") name = [this._mapId, this._eventId, args.shift().toLowerCase()];
		else if (name == "map") name = [this._mapId, 0, args.shift().toLowerCase()];
		else if (name == "actor") name = [0, Number(args.shift()), args.shift().toLowerCase()];
		else if (name == "enemy") name = ["e", Number(args.shift()), args.shift().toLowerCase()];
		else if (name == "custom") name = [args.shift(), args.shift(), args.shift().toLowerCase()];
		else if (name == "member") {
		    name = [0, Number(args.shift()), args.shift().toLowerCase()];
		    if (!$gameParty.allMembers()[name[1]]) return;
		    name[1] = $gameParty.allMembers()[name[1]].actorId();
		}
		$gameVariables.setValue(Number(args.shift()), $gameTimer.realTimeLeft(name));
	}
};

//=============================================================================
// Game_Map
//=============================================================================

ICF.TimeUtil.mapsetup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	ICF.TimeUtil.GetDate();
	ICF.TimeUtil.mapsetup.call(this, mapId);
};

//=============================================================================
// Game_System
//=============================================================================

Game_System.prototype.playtime = function() {
    return Math.floor(Graphics.frameCount / 60);
};

//=============================================================================
// Game_Timer
//=============================================================================

ICF.TimeUtil.initTimer = Game_Timer.prototype.initialize;
Game_Timer.prototype.initialize = function() {
    ICF.TimeUtil.initTimer.call(this);
    this._rtimers = {};
    this._rtimerKeys = [];
};

ICF.TimeUtil.updateTimer = Game_Timer.prototype.update;
Game_Timer.prototype.update = function(sceneActive) {
    ICF.TimeUtil.updateTimer.call(this, sceneActive);
    if (!this._rtimers) {
	this._rtimers = {};
	this._rtimerKeys = [];
    }
    if ((Graphics.frameCount % 60) == 0 && this._rtimerKeys.length > 0) {
	var date = new Date();
	date = Math.trunc(date.getTime() / 1000);
	while (date >= this._rtimers[this._rtimerKeys[0]][0]) {
	    this.realTriggerRun(this._rtimers[this._rtimerKeys[0]], this._rtimerKeys[0]);
	    delete this._rtimers[this._rtimerKeys[0]];
	    this._rtimerKeys.shift();
	}
    }
};

Game_Timer.prototype.realTriggerRun = function(timer, key) {
    switch (timer[1]) {
	case "switchon":
	    $gameSwitches.setValue(timer[2], true);
	    break;
	case "switchoff":
	    $gameSwitches.setValue(timer[2], false);
	    break;
	case "switchtoogle":
	    $gameSwitches.toogleValue(timer[2]);
	    break;
	case "selfswitchon":
	    $gameSelfSwitches.setValue(key, true);
	    break;
	case "selfswitchoff":
	    $gameSelfSwitches.setValue(key, false);
	    break;
	case "selfswitchtoogle":
	    $gameSelfSwitches.toogleValue(key);
	    break;
	case "variable":
	    $gameVariables.setValue(timer[2], timer[3]);
	    break;
	case "increasevariable":
	    $gameVariables.increaseValue(timer[2], timer[3]);
	    break;
	case "multiplyvariable":
	    $gameVariables.multiplyValue(timer[2], timer[3]);
	    break;
	case "dividevariable":
	    $gameVariables.divideValue(timer[2], timer[3]);
	    break;
	case "modvariable":
	    $gameVariables.modValue(timer[2], timer[3]);
	    break;
	case "selfvariable":
	    $gameSelfVariables.setValue(key, timer[3]);
	    break;
	case "increaseselfvariable":
	    $gameSelfVariables.increaseValue(key, timer[3]);
	    break;
	case "multiplyselfvariable":
	    $gameSelfVariables.multiplyValue(key, timer[3]);
	    break;
	case "divideselfvariable":
	    $gameSelfVariables.divideValue(key, timer[3]);
	    break;
	case "modselfvariable":
	    $gameSelfVariables.modValue(key, timer[3]);
	    break;
	case "eval":
	    eval(timer[2]);
	    break;
	default:
    }
    if (timer[4] > 0) $gameTemp.reserveCommonEvent(timer[4]);
};

Game_Timer.prototype.addRTimer = function(timer, key) {
    this._rtimers[key] = timer;
    if (!this._rtimerKeys.contains(key)) this._rtimerKeys.push(key);
    var timers = this._rtimers;
    this._rtimerKeys.sort(function (a, b) {
	return timers[a][0] - timers[b][0];
    });
};

Game_Timer.prototype.deleteRTimer = function(key) {
    if (this._rtimers[key]) delete this._rtimers[key];
    if (this._rtimerKeys.contains(key)) this._rtimerKeys.splice(this._rtimerKeys.indexOf(key),1);
};

Game_Timer.prototype.hasRTimer = function(key) {
    return this._rtimerKeys.contains(key) && this._rtimers[key];
};

Game_Timer.prototype.realTimeLeft = function(key) {
    if (!this.hasRTimer(key)) return -1;
    var date = new Date();
    date = Math.trunc(date.getTime() / 1000);
    return this._rtimers[key][0] - date;
};

//=============================================================================
// Game_Switches
//=============================================================================

ICF.TimeUtil.Game_Switches_value = Game_Switches.prototype.value;
Game_Switches.prototype.value = function(switchId) {
  if (ICF.Param.TimeFixedInt.indexOf(switchId) > -1) {
    return (ICF.TimeUtil.Day == ICF.Param.TimeFixedData[ICF.Param.TimeFixedInt.indexOf(switchId)]);
  } else if (ICF.Param.TimeVarsInt.indexOf(switchId) > -1) {
    return (ICF.TimeUtil.Day == $gameVariables.value(ICF.Param.TimeVarsData[ICF.Param.TimeVarsInt.indexOf(switchId)]));
  } else {
    return ICF.TimeUtil.Game_Switches_value.call(this, switchId);
  }
};

Game_Switches.prototype.toogleValue = function(switchId) {
    this.setValue(!this.value(switchId));
};

//=============================================================================
// Game_SelfSwitches
//=============================================================================

Game_SelfSwitches.prototype.toogleValue = function(key) {
    this.setValue(!this.value(key));
};

//=============================================================================
// Game_Variables
//=============================================================================

Game_Variables.prototype.increaseValue = function(variableId, value) {
    this.setValue(variableId, this.value(variableId) + value);
};

Game_Variables.prototype.multiplyValue = function(variableId, value) {
    this.setValue(variableId, this.value(variableId) * value);
};

Game_Variables.prototype.divideValue = function(variableId, value) {
    if (value != 0) this.setValue(variableId, this.value(variableId) / value);
};

Game_Variables.prototype.modValue = function(variableId, value) {
    if (value != 0) this.setValue(variableId, this.value(variableId) % value);
};

//=============================================================================
// End of File
//=============================================================================