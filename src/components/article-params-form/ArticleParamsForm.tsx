import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { clsx } from 'clsx';
import { useState } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';

// type articleProps ={

// }

export const ArticleParamsForm = () => {
	const [articleState, setArticleState] = useState(defaultArticleState); // стейт состояния параметров формы
	const [openMenu, setOpenMenu] = useState<boolean>(false); // стейт для состояния сайдбара

	const toogleMenuVisibility = () => {
		setOpenMenu((openMenu) => !openMenu);
	};

	const handleSetState = (
		propertyName: keyof ArticleStateType,
		option: OptionType
	) => {
		setArticleState((prevState) => ({
			...prevState,
			[propertyName]: option, // Обновляем указанное свойство
		}));
	};

	const handleResetForm = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={openMenu} onClick={toogleMenuVisibility} />
			<aside
				className={clsx(styles.container, openMenu && styles.container_open)}>
				<form className={styles.form}>
					<Text as='h2' weight={800} size={31} uppercase>
						задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							handleSetState('fontFamilyOption', option)
						}></Select>
					<Separator />
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetForm}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
