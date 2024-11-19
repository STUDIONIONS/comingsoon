<?php

class RenberOpenGraph
{
	const VERSION = '1.0.0';

	private $corePath;
	private $path;

	private $params = [];
	private $lang = null;
	private $manager = [];

	public function __construct($params = [])
	{
		$this->params['menu'] = isset($_GET['type']) && is_string($_GET['type']) ? $_GET['type'] : 'default';

		$this->corePath = rtrim(realpath(__DIR__ . '/'), '/') . '/';

		$this->path = str_replace(MODX_BASE_PATH, "", $this->corePath);

		$evo = EvolutionCMS();
		$manager_id = $evo->getLoginUserID('mgr');
		$this->manager = $evo->getUserInfo($manager_id);
	}

	public function processRequest()
	{
		echo $this->render();
	}

	public function getModuleId()
	{
		$modx = EvolutionCMS();
		return $modx->db->getValue($modx->db->select('id', $modx->getFullTablename('site_modules'), "name = 'RenderOpenGraphImage'"));
	}

	public function loadLang()
	{
		if ($this->lang === null) {
			$modx  = EvolutionCMS();
			$_lang = [];

			$userlang = $modx->getLocale();

			foreach ([$userlang, 'en'] as $l) {
				if (is_readable($this->corePath . 'lang/' . $l . '/cs.inc.php')) {
					$lang = include $this->corePath . 'lang/' . $l . '/cs.inc.php';
					break;
				}
			}

			$this->lang = array_merge($_lang, $lang);
		}

		return $this->lang;
	}

	private function render()
	{
		global $content, $_style, $lastInstallTime, $modx_lang_attribute;
		$content['richtext'] = 1;

		if (!isset($_COOKIE['MODX_themeMode'])) {
			$_COOKIE['MODX_themeMode'] = '';
		}

		$modx                 = EvolutionCMS();
		$managerPath          = $modx->getManagerPath();
		$modx_manager_charset = evo()->getConfig('modx_charset', 'utf-8');
		$version              = self::VERSION;
		$stay                 = $_REQUEST['stay'];
		$_lang                = $this->loadLang();
		$params               = $this->params;
		$mid                  = $this->getModuleId();
		setlocale(LC_NUMERIC, 'C');
		ob_start();

		include_once MODX_MANAGER_PATH . 'includes/header.inc.php';
		include $this->corePath . 'index.tpl';
		include_once MODX_MANAGER_PATH . 'includes/footer.inc.php';

		return ob_get_clean();
	}
}
