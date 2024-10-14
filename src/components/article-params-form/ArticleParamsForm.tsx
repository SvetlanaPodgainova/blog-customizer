import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { clsx } from 'clsx';
import { useState } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

type articleProps = {
	articleStateSubmit: (newState: ArticleStateType) => void;
	articleStateReset: () => void;
};

export const ArticleParamsForm = (props: articleProps) => {
	const [sideBarState, setSideBarState] = useState(defaultArticleState);
	const [openMenu, setOpenMenu] = useState<boolean>(false);

	const toogleMenuVisibility = () => {
		setOpenMenu((openMenu) => !openMenu);
	};

	const handleSetSideBarState = (
		optionName: keyof ArticleStateType,
		option: OptionType
	) => {
		setSideBarState((prevState) => ({
			...prevState,
			[optionName]: option,
		}));
	};

	const handleSubmitArticleState = (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		props.articleStateSubmit(sideBarState);
	};

	const handleResetSideBarState = () => {
		props.articleStateReset();
	};

	return (
		<>
			<ArrowButton isOpen={openMenu} onClick={toogleMenuVisibility} />
			<aside
				className={clsx(styles.container, openMenu && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmitArticleState}>
					<Text as='h2' weight={800} size={31} uppercase>
						задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						options={fontFamilyOptions}
						selected={sideBarState.fontFamilyOption}
						onChange={(option) =>
							handleSetSideBarState('fontFamilyOption', option)
						}
					/>
					<RadioGroup
						name='fontSize'
						title='размер шрифта'
						options={fontSizeOptions}
						selected={sideBarState.fontSizeOption}
						onChange={(option) =>
							handleSetSideBarState('fontSizeOption', option)
						}
					/>
					<Select
						title={'Цвет шрифта'}
						options={fontColors}
						selected={sideBarState.fontColor}
						onChange={(option) => handleSetSideBarState('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={sideBarState.backgroundColor}
						onChange={(option) =>
							handleSetSideBarState('backgroundColor', option)
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={sideBarState.contentWidth}
						onChange={(option) => handleSetSideBarState('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetSideBarState}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
